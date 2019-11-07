const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users'); // Model Class = User

passport.serializeUser((user, done) => { // The 'user' we pulled out of the database before/below.
  done(null, user.id); // Where id is a unique identifier automatically generated by mongo and assigned to the record we create/retrieve below.
  // ^ Not the same as the google profile id. Allows us to be agnostic towards the authentication method. 
});

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
          done(null, existingUser);
        } else {
          // make a new record
          new User({ googleId: profile.id }).save()
          // ^Creates a distinct model instance. ".save()" takes the model instance and saves it to the database.
            .then(user => done(null, user));
        }
      })
  })
);
