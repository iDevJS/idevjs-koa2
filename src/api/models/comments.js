import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    pid: {
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
      default: 'markdown',
      enum: ['html', 'markdown']
    },
    hidden: {
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
    client_id: {
      type: String
    },
    meta: {
      downvotes: {
        type: Array
      },
      upvotes: {
        type: Array
      }
    }
  },
  {
    id: false
  }
)

commentSchema.set('toObject', { virtuals: true })
commentSchema.set('toJSON', { virtuals: true })

commentSchema.virtual('author', {
  ref: 'User',
  localField: 'author_name',
  foreignField: 'name',
  justOne: true
})

commentSchema.statics.paginate = function (query, opt) {
  let defs = Object.assign({}, { page: 1, per_page: 20 }, opt)
  const offset = (parseInt(defs.page, 10) - 1) * parseInt(defs.per_page)
  return this.find(query).sort(opt.sort).skip(offset).limit(parseInt(defs.per_page))
}

commentSchema.pre('save', (next) => {
  next()
})

export default mongoose.model('Comment', commentSchema)
