const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tiempo_inicio: { type: Date },
    description: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Available', 'Booked'], default: 'Available' }
});

module.exports = mongoose.model('Product', ProductSchema);
