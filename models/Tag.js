import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
  name: String,
  logo: String,
  favicon: String
});

export default mongoose.model('Tag', TagSchema);
