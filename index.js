const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

const {mongoUser, mongoPass, mongoHost, mongoPort, mongoDatabase, cookieKey} = keys;
const uri = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDatabase}`;
mongoose.connect(uri);

const app = express();
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, //ms
  keys: [cookieKey]
}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT);
