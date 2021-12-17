import mongoose from "mongoose";
import md5 from "md5";
import {isEmail} from 'validator';

const schema = new mongoose.Schema({
  username: {type: String, unique: true, trim: true, required: 'Username is required',},
  uid: {type: String, unique: true, trim: true, required: 'UID is required',},
  email: {type: String, unique: true, trim: true, lowercase: true, validate: [isEmail, 'invalid email']},
  password: String,
  superUser: Boolean,
}, {
  timestamps: {createdAt: 'createdAt'},
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
})

schema.methods.publicData = function () {
  const {username, email, createdAt} = this;
  return {username, email, createdAt};
}

schema.methods.checkPasswd = function (passwd) {
  return md5(passwd) === this.password;
}

schema.methods.setPasswd = function (passwd) {
  this.password = md5(passwd);
}


export default mongoose.model('user', schema)
