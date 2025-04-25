const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  personalInfo: {
    name: String,
    email: String,
    country: String,
    age: Number,
    photo_src: String,
    location: String,
    zipcode: String,
  },
  account: {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    last_login: { type: Date, default: null },
    tokens: [{ token: String }]
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);