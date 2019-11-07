const passport = require('passport');

module.exports = (app) => { // Export this function from this file.
  // (app) is the assumption that we will call this function with our express app object.
  app.get(
    '/auth/google',
    passport.authenticate('google', { // whenever someone comes to this route, we want to kick them into our OAuth flow (passport).
      scope: ['profile', 'email'] // tell passport to attempt to authenticate on this route using the strategy google.
      // "give us this users profile information and email as well."
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google')); // code in the URL is now available, user has given us permission.

  app.get('/api/current_user', (req, res) => {
    res.send(req.user) // Shows that someone who has gone through the oauth flow receives a response...
    // ... aka has access to the user!
  });
};
