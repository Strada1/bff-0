import mongoose from 'mongoose';

export default async function (url) {
   try {
     await mongoose.connect(url, {
       useNewUrlParser: true,
       useUnifiedTopology: true
     });
     console.log('Database connected');
   } catch (err) {
     console.error('Database error', err)
   }
}
