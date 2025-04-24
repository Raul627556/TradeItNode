const mongoose = require('mongoose');

const UserRatingSchema = new mongoose.Schema({
  user_seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user_client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  commentary: String,
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model('UserRating', UserRatingSchema);
