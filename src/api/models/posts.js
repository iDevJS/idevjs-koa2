import mongoose from 'mongoose'

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
  sticky: {
    type: Boolean,
    default: false
  },
  recommend: {
    type: Boolean,
    default: false
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
  client_id: {
    type: String
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
},
  {
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

postSchema.statics.paginate = function (query, opt) {
  let defs = Object.assign({}, { page: 1, per_page: 20 }, opt)
  const offset = (parseInt(defs.page, 10) - 1) * parseInt(defs.per_page)

  let sort = { last_comment_at: -1, updated_at: -1 }
  if (opt.tab === 'hot') {
    sort = { 'meta.comments': -1 }
  } else if (opt.tab === 'new') {
    sort = { created_at: -1 }
  } else if (opt.tab === 'recommend') {
    query.recommend = true
  } else if (opt.tab === 'job') {
    query.tab = 'job'
  } else {
    query.tab = opt.tab
  }

  // since, before, one day/week/month
  return this.find(query).sort(sort).skip(offset).limit(parseInt(defs.per_page))
}

postSchema.pre('save', (next) => {
  next()
})

// Post.methods.validate = () => {

// }

export default mongoose.model('Post', postSchema)
