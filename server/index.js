const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport'); // Lines 3 and 4 are to get access to cookies and then be able to tell passport to make use of them.
const keys = require('./config/keys');
require('./models/User');
require('./services/passport'); // Need this otherwise this code would not be executed by default.
// Can just be a base require because we are not exporting anything from passport.js to use here.

mongoose.connect(keys.mongoURI);
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days before this cookie would expire, in milliseconds.
    keys: [keys.cookieKey] // Key to encrypt the cookie, automatically.
  })
);

// Tell passport to use the cookies we created above.
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // authRoutes is a function that imports/attaches the routes from the authRoutes file.
// Takes the returned function we exported, and immediately call it with the app function.

const PORT = process.env.PORT || 5000;
app.listen(PORT);
