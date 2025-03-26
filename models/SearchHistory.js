const mongoose = require('mongoose');

const SearchHistorySchema = new mongoose.Schema({
  searched_text: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('SearchHistory', SearchHistorySchema);
