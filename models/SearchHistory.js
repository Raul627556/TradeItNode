const mongoose = require('mongoose');

const SearchHistorySchema = new mongoose.Schema({
    searched_text: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('SearchHistory', SearchHistorySchema);
