import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true, index: true },
  bio: { type: String },
  location: { type: String },
  company: { type: String },
  blog: { type: String },
  hireable: { type: Boolean },
  site_amdin: {
    type: Boolean,
    default: false
  },
  node_admin: { type: Boolean },
  owned_nodes: { type: Array },
  meta: {
    followers: {
      type: Number,
      default: 0
    },
    following: {
      type: Number,
      default: 0
    },
    posts: {
      type: Number,
      default: 0
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('User', userSchema)
