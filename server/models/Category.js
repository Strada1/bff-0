import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  title: {
    type: 'String',
    required: true,
    unique: true,
  },
});

export default mongoose.model('Category', CategorySchema);

