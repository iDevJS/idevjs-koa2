import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  author_name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  content_format: {
    type: String,
    required: true,
    enum: ['html', 'markdown']
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
    downvotes: {
      type: Array
    },
    upvotes: {
      type: Array
    }
  }
}, {
  id: false
})

commentSchema.set('toObject', { virtuals: true })
commentSchema.set('toJSON', { virtuals: true })

commentSchema.virtual('author', {
  ref: 'User',
  localField: 'author_name',
  foreignField: 'name',
  justOne: true
})

commentSchema.pre('save', (next) => {
  next()
})

export default mongoose.model('Comment', commentSchema)
