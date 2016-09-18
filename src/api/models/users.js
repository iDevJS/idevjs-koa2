import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, index: true },
  meta: {
    followers: {
      type: Number,
      default: 0
    },
    followees: {
      type: Number,
      default: 0
    },
    posts: {
      type: Number,
      default: 0
    }
  }
})

export default mongoose.model('User', userSchema)
