import mongoose from 'mongoose';

const TradeProposalSchema = new mongoose.Schema({
  offered_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  received_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  offered_products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  requested_products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  money_offered: { type: Number, default: 0 }, // puede ser 0 si es solo trueque
  money_requested: { type: Number, default: 0 }, // puede ser 0 si es solo trueque
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  message: String
}, { timestamps: true });

export default mongoose.model('TradeProposal', TradeProposalSchema);
