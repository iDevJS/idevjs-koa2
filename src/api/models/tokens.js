import mongoose from 'mongoose'
const Schema = mongoose.Schema

const tokenSchema = new mongoose.Schema({
  access_token: {
    type: String,
    required: true,
    unique: true
  },
  refresh_token: {
    type: String
  },
  token_type: {
    type: String
  },
  client_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Client'
  },
  scope: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  expires_at: {
    type: Date,
    required: true
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

tokenSchema.set('toObject', { virtuals: true })
tokenSchema.set('toJSON', { virtuals: true })

// tokenSchema.virtual('client', {
//   ref: 'Client',
//   localField: 'client_id',
//   foreignField: '_id',
//   justOne: true
// })

tokenSchema.virtual('user', {
  ref: 'User',
  localField: 'username',
  foreignField: 'name',
  justOne: true
})

export default mongoose.model('Token', tokenSchema)
