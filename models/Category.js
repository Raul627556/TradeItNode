import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: String,
  isSubCategory: Boolean,
  description: String,
  favicon: String
});

export default mongoose.model('Category', CategorySchema);
