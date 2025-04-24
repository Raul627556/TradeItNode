import mongoose from 'mongoose';

const NotificationTypeSchema = new mongoose.Schema({
  name: String,
  description: String
});

export default mongoose.model('NotificationType', NotificationTypeSchema);
