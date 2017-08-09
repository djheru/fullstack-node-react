const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

const {mongoUser, mongoPass, mongoHosts, mongoDatabase, mongoOptions, cookieKey} = keys;
const uri = `mongodb://${mongoUser}:${mongoPass}@${mongoHosts.join(',')}/${mongoDatabase}?${mongoOptions}`;
mongoose.connect(uri);

const app = express();
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, //ms
  keys: [cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT);
