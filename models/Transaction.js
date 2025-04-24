const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  user_seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user_client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
