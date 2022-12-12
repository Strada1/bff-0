import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: String,
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Message', MessageSchema);
