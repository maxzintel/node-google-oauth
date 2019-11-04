const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' // The route the user will be sent to after they grant our application permission.
  }, (accessToken, refreshToken, profile, done) => {
    new User({ googleId: profile.id }).save(); // Creates a distinct model instance. ".save()" takes the model instance and saves it to the database.
  })
);
