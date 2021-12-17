import * as Mongoose from '../../models';
import mongoose from 'mongoose';

export default {
  short: 'Fill DB',
  help: 'just run',
  run(argv) {
    mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(conn => {
        console.log('Connect MongoDB:', process.env.MONGODB_URI,)
        for (let i = 0; i < 100; i++) {
          Mongoose.post.create({title: `title - ${i}`})
        }
      })
  }
}
