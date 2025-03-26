const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: String,
  isSubCategory: Boolean,
  description: String,
  favicon: String
});

module.exports = mongoose.model('Category', CategorySchema);
