const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy({ // Known as a strategy called google (for passport below).
    clientID: keys.googleClientID,
    clientSecret: keys.googleSecret,
    callbackURL: '/auth/google/callback' // The route the user will be sent to after they grant our application permission.
    // TO DO: Route Handler for the above.
  }, (accessToken) => {
    console.log(accessToken);
  })
);

app.get(
  '/auth/google',
  passport.authenticate('google', { // whenever someone comes to this route, we want to kick them into our OAuth flow (passport).
    scope: ['profile', 'email'] // tell passport to attempt to authenticate on this route using the strategy google.
    // "give us this users profile information and email as well."
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
