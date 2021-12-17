import mongoose from "mongoose";
import md5 from "md5";
import {isEmail} from 'validator';

const schema = new mongoose.Schema({
  username: {type: String, unique: true, trim: true, required: 'Username is required',},
  email: {type: String, unique: true, trim: true, lowercase: true, validate: [isEmail, 'invalid email']},
  password: String,
  avatar: String,
  fullName: String,
  superUser: Boolean,
}, {
  timestamps: {createdAt: 'createdAt'},
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
})

schema.virtual('name')
  .get(function () {
    return this.fullName || this.username;
  })
  .set(function (name) {
    return this.fullName = name;
  });

schema.virtual('public')
  .get(function () {
    const {password, ...rest} = this._doc;
    return rest;
  })

schema.methods.checkPasswd = function (passwd) {
  return md5(passwd) === this.password;
}

schema.methods.setPasswd = function (passwd) {
  this.password = md5(passwd);
}


export default mongoose.model('user', schema)
