import mongoose from 'mongoose';

const UserRatingSchema = new mongoose.Schema({
  user_seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user_client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  commentary: String,
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

export default mongoose.model('UserRating', UserRatingSchema);
