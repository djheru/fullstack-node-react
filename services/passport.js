const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  return User
    .findById(userId)
    .then(user => done(null, user));
});

console.log(process.env);

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: keys.googleCallbackURL,
  proxy: true
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id }).then(existingUser => {
    if (existingUser) {
      // we already have a record with the given profile ID
      done(null, existingUser);
    } else {
      // we don't have a user record with this ID, make a new record!
      new User({ googleId: profile.id })
        .save()
        .then(user => done(null, user));
    }
  });
}));
