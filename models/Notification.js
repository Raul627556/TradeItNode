const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  datetime: Date,
  notification_type: { type: mongoose.Schema.Types.ObjectId, ref: 'NotificationType' },
  status: { type: String, enum: ['read', 'unread'], default: 'unread' }
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
