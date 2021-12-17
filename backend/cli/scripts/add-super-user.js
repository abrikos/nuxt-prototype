import * as Mongoose from '../../models';
import mongoose from 'mongoose';

export default {
  short: 'Add superuser attribute',
  help: `
Arguments: -u <username>
`,
  run(argv){
    if(!argv.u) return console.log('No user specified:',this.help)
    mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(conn => {
        console.log('Connect MongoDB:', process.env.MONGODB_URI, )
        Mongoose.user.findOne({username:argv.u})
          .then(async user=>{
            if(user) {
              user.superUser = true
              await user.save();
              console.log(`User "${user.username}" now is super admin`)
            }else{
              console.log(`Wrong username: "${argv.u}"`)
            }
            conn.connections[0].close();
          })
          .catch(e=> {
            conn.connections[0].close();
            console.log(e);
          })
      })
      .catch(e => {
        console.log('Mongoose error:', e.message)
      })


  }
}
