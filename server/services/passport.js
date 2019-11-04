const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users'); // Model Class = User

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' // The route the user will be sent to after they grant our application permission.
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }) // Returns a promise
      .then((existingUser) => {
        if (existingUser) {
          // we already have a record with the given profile id.
        } else {
          // make a new record
          new User({ googleId: profile.id }).save();
          // Creates a distinct model instance. ".save()" takes the model instance and saves it to the database.
        }
      })
  })
);
