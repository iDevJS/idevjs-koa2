import mongoose from 'mongoose'

const nodeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  alias: { type: String },
  bio: { type: String },
  tabs: {
    type: Array,
    default: [
      { 'alias': '分享', 'name': 'share' },
      { 'alias': '问答', 'name': 'qna' }
    ]
  },
  admins: {
    type: Array
  },
  meta: {
    posts: { type: Number, default: 0 },
    followers: { type: Number, default: 0 }
  }
})

export default mongoose.model('Node', nodeSchema)
