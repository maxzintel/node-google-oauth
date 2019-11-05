const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport'); // Need this otherwise this code would not be executed by default.
// Can just be a base require because we are not exporting anything from passport.js to use here.

mongoose.connect(keys.mongoURI);
const app = express();

require('./routes/authRoutes')(app); // authRoutes is a function that imports/attaches the routes from the authRoutes file.
// Takes the returned function we exported, and immediately call it with the app function.

const PORT = process.env.PORT || 5000;
app.listen(PORT);
