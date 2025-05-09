const mongoose = require('mongoose');

const UserChatSchema = new mongoose.Schema({
  user_1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user_2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    sent_at: Date
  }]
}, { timestamps: true });

module.exports = mongoose.model('UserChat', UserChatSchema);