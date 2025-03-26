const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  personalInfo: {
    name: String,
    email: String,
    country: { type: String, required: false },
    age: { type: Number, required: false },
    photo_src: { type: String, required: false },
    location: { type: String, required: false },
    zipcode: { type: String, required: false },
  },
  account: {
    username: { type: String, required: false, unique: true },
    passwordHash: { type: String, required: true },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    last_login: { type: Date, default: null },
    tokens: [{ token: String }]
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);