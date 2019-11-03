const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' // The route the user will be sent to after they grant our application permission.
  }, (accessToken, refreshToken, profile, done) => {
    console.log('accessToken: ', accessToken, '/n refreshToken: ', refreshToken, '/n profile: ', profile);
    // refresh token will automatically update the accessToken to continue granting their access for a period of time.
  })
);