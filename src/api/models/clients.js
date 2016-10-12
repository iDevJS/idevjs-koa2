import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  client_secret: {
    type: String,
    required: true
  },
  scope: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  alias: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  site_uri: {
    type: String,
    required: true
  },
  redirect_uri: {
    type: String,
    required: true
  },
  invalid: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  meta: {
    users: { type: Number, default: 0 }
  }
})

export default mongoose.model('Client', clientSchema)
