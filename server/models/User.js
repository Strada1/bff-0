import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  username: String,
  roles: [String],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movies',
  }],
}, {
  timestamps: true,
});

export default mongoose.model('User', UserSchema);
