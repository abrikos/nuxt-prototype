import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  uid: String,
  expiration: Date,
}, {
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
})

export default mongoose.model('token', schema)
