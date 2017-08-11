const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  const user = await User.findById(userId);
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: keys.googleCallbackURL,
  proxy: true
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id });
  if (existingUser) {
    // we already have a record with the given profile ID
    done(null, existingUser);
  } else {
    // we don't have a user record with this ID, make a new record!
    const newUser = new User({ googleId: profile.id }).save();
    done(null, newUser);
  }
}));
