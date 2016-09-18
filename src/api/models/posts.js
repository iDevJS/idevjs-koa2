import mongoose from 'mongoose'
import marked from 'marked'

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  node_name: {
    type: String,
    required: true
  },
  tab: {
    type: String,
    required: true
  },
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
    views: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    votes: {
      type: Number,
      default: 0
    }
  }
}, {
  id: false
})

postSchema.set('toObject', { virtuals: true })
postSchema.set('toJSON', { virtuals: true })

postSchema.virtual('author', {
  ref: 'User',
  localField: 'author_name',
  foreignField: 'name',
  justOne: true
})

postSchema.virtual('last_comment_user', {
  ref: 'User',
  localField: 'last_comment_by',
  foreignField: 'name',
  justOne: true
})

postSchema.virtual('node', {
  ref: 'Node',
  localField: 'node_name',
  foreignField: 'name',
  justOne: true
})

postSchema.pre('save', (next) => {
  next()
})

// Post.methods.validate = () => {

// }

export default mongoose.model('Post', postSchema)
