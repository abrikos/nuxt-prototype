import * as Mongoose from '../../models';
import mongoose from 'mongoose';

export default {
  short: 'Add new user',
  help: `Arguments: -u <username> -p <password>`,
  run(argv) {
    if (!argv.u) return console.log('No user specified:', this.help)
    if (!argv.p) return console.log('No password specified:', this.help)
    mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(conn => {
        console.log('Connect MongoDB:', process.env.MONGODB_URI,)
        Mongoose.user.create({username: argv.u})
          .then(async user => {
            user.setPasswd(argv.p);
            await user.save();
            console.log(`User "${user.username}" created`)
            conn.connections[0].close();
          })
          .catch(e => {
            conn.connections[0].close();
            console.log(e);
          })
          .catch(e => {
            console.log('Mongoose error:', e.message)
          })
      })



  }
}
