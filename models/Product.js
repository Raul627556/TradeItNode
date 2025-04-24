import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  tiempo_inicio: Date,
  description: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['available', 'booked', 'traded'], default: 'available' },
  photos: [String],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);
