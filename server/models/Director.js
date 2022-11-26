import mongoose from 'mongoose';

const DirectorScheme = new mongoose.Schema({
  name: {
    type: 'String',
    require: true,
  }/*,
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  }]*/
});

export default mongoose.model('Director', DirectorScheme);

