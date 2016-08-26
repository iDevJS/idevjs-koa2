import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  node: {
    type: String,
    required: true
  },
  tab: {
    type: String,
    required: true
  },
  author: {
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
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
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
})

var virtual = postSchema.virtual('author', {
  ref: 'User',
  localField: 'name',
  foreignField: 'author',
  justOne: true
})
console.log(virtual)
virtual.get(function(){
  return this
})

postSchema.virtual('node', {
  ref: 'Node',
  localField: 'name',
  foreignField: 'node',
  justOne: true
})

// Post.pre('save', (next) => {
//   console.log(this)
// })

// Post.methods.validate = () => {

// }

export default mongoose.model('Post', postSchema)
