const mongoose = require('mongoose');
const { Schema } = mongoose; // Define all possible properties in a model class beforehand.

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
