const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const requireCredits = require('../middlewares/requireCredits');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
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
};
