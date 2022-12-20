import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Chat', ChatSchema);
