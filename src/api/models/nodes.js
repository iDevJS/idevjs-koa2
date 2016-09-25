import mongoose from 'mongoose'

const nodeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  bio: { type: String },
  meta: {
    posts: { type: Number, default: 0 },
    followers: { type: Number, default: 0 }
  }
})

export default mongoose.model('Node', nodeSchema)
