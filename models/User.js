const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    last_login: { type: Date, default: Date.now },
    photo_src: { type: String },
    location: { type: String },
    zipcode: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
