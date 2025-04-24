import mongoose from 'mongoose';

const SearchHistorySchema = new mongoose.Schema({
  searched_text: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('SearchHistory', SearchHistorySchema);
