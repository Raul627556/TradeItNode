const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: String,
  logo: String,
  favicon: String
});

module.exports = mongoose.model('Tag', TagSchema);