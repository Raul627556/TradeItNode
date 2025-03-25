const mongoose = require('mongoose');

const UserChatSchema = new mongoose.Schema({
    user_1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user_2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});

module.exports = mongoose.model('UserChat', UserChatSchema);
