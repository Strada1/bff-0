import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: Number,
  duration: Number,
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  directors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
  }],
});

export default mongoose.model('Movie', MovieSchema);