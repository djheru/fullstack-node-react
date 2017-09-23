const mongoose = require('mongoose');
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const requireCredits = require('../middlewares/requireCredits');
const requireLogin = require('../middlewares/requireLogin');

const processEvent = ({email, url}) => {
  if (!email || !url) {
    return;
  }
  const surveyResponsePath = new Path('/api/surveys/:surveyId/:choice');
  const match = surveyResponsePath.test(new URL(url).pathname);
  if (match) {
    const { choice, surveyId } = match;
    return { choice, email, surveyId};
  }
};

const updateEvent = ({ choice, email, surveyId }) => Survey.updateOne(
  {
    _id: surveyId,
    recipients: {
      $elemMatch: { email, responded: false }
    }
  },
  {
    $inc: { [choice]: 1 }, // increment interpolated key
    $set: { 'recipients.$.responded': true },
    lastResponded: Date.now()
  }
).exec();

module.exports = (app) => {

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    _.chain(req.body)
      .map(processEvent)
      .compact()
      .uniqBy('email', 'surveyId')
      .each(updateEvent)
      .value();
    res.sendStatus(200);
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title, subject, body,
      recipients: recipients.split(',').map(email => ({email: email.trim()})),
      _user: req.user._id,
      dateSent: Date.now()
    });

    try {
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (e) {
      res.status(422).send(e);
    }
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey
      .find({ _user: req.user.id })
      .select({ recipients: false });
    res.send(surveys);
  });
};
