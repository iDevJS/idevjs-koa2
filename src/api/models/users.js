import mongoose from 'mongoose'

const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true }
})

export default mongoose.model('user', User)
