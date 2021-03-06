import mongoose from "mongoose";
import md5 from "md5";
import {isEmail} from 'validator';

const schema = new mongoose.Schema({
  username: {type: String, unique: true, trim: true, required: 'Username is required',},
  email: {type: String, unique: true, trim: true, lowercase: true, validate: [isEmail, 'invalid email']},
  password: String,
  name: String,
  avatar: String,
  superUser: Boolean
}, {
  timestamps: {createdAt: 'createdAt'},
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
})

schema.virtual('alias')
  .get(function () {
    return this.name || this.username
  });

schema.methods.publicData = function (token) {
  const {username, email, name, avatar, createdAt, alias} = this;
  return {username, email, name, avatar, createdAt, alias, token};
}

schema.methods.readToken = function (token) {
  const {username, email, createdAt} = this;
  return {username, email, createdAt, token};
}

schema.methods.checkPasswd = function (passwd) {
  return md5(passwd) === this.password;
}

schema.methods.setPasswd = function (passwd) {
  this.password = md5(passwd);
}

schema.virtual('tokens', {
  ref: 'token',
  localField: 'user',
  foreignField: '_id'
})

export default mongoose.model('user', schema)
