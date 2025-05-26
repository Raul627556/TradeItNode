const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // los demás campos son opcionales
    country: { type: String },
    age: { type: Number },
    photo_src: { type: String },
    location: { type: String },
    zipcode: { type: String },
  },
  account: {
    username: { type: String, sparse: true, unique: true }, // no lo pasas aún, así que opcional
    passwordHash: { type: String, required: true },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    last_login: { type: Date, default: null },
    tokens: [{ token: { type: String } }],
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
