import mongoose from 'mongoose';

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

export default mongoose.model('User', UserSchema);
