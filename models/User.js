const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  country: String,
  email: String,
  age: Number,
  last_login: Date,
  photo_src: String,
  location: String,
  zipcode: String,
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);