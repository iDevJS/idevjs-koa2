import mongoose from 'mongoose'

const Post = new mongoose.Schema({
  title: { type: String, required: true },
  node: { type: String, required: true },
  tab: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  content_format: { type: String, required: true },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  meta: {
    views: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    votes: { type: Number, default: 0 }
  }
})

Post.pre('save', (next) => {

})

Post.methods.validate = () => {

}

export default mongoose.model('post', Post)
