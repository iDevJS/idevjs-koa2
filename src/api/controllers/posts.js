import marked from 'marked'
import Post from '../models/posts'

const USER_SELECT = 'name gravatar meta'
const POPULATE_OPTION = [
  {
    path: 'author', select: USER_SELECT
  }, {
    path: 'last_comment_user', select: USER_SELECT
  }, {
    path: 'node'
  }
]

export default {
  getPost: async (ctx, next) => {
    const query = ctx.query
    await Post.findByIdAndUpdate(
      ctx.params.pid,
      {
        $inc: { 'meta.views': 1 }
      }
    )
      .populate(POPULATE_OPTION)
      .exec()
      .then(ret => {
        if (query.content_format !== 'markdown') {
          ret.content = marked(ret.content)
        }
        ctx.body = ret
      }).catch(err => {
        ctx.body = err
      })
  },
  addPost: async (ctx, next) => {
    const post = new Post(ctx.request.body)
    await post.save()
      .then(ret => {
        return Post.populate(ret, POPULATE_OPTION)
      })
      .then(ret => {
        ctx.body = ret
      })
      .catch(err => {
        ctx.body = err
      })
  },
  updatePost: async (ctx, next) => {
    const body = ctx.request.body
    await Post.findByIdAndUpdate(
      ctx.params.pid, {
        $set: {
          title: body.title,
          content: body.content,
          node_name: body.node_name,
          tab: body.tab
        }
      }, {
        new: true
      })
      .populate(POPULATE_OPTION)
      .exec()
      .then(ret => {
        ctx.body = ret
      }).catch(err => {
        ctx.body = err
      })
  },
  listPost: async (ctx, next) => {
    const query = ctx.query
    const tabList = [
      'all',
      'hot',
      'recommend',
      'new',
      'job'
    ]
    let opt = {}
    let sort = { last_comment_at: -1, updated_at: -1 }
    if (query.tab === 'hot') {
      sort = { 'meta.comments': -1 }
    } else if (query.tab === 'new') {
      sort = { created_at: -1 }
    } else if (query.tab === 'recommend') {
      opt = { recommend: true }
    } else if (query.tab === 'job') {
      opt = { tab: 'job' }
    }

    await Post
      .find(opt)
      .sort(sort)
      .populate(POPULATE_OPTION)
      .select({ content: 0 }) // no content
      .exec()
      .then(ret => {
        ctx.body = ret
      })
      .catch(err => {
        ctx.body = err
      })
  },
  nodePost: async (ctx, next) => {
    await Post.find({ node_name: ctx.params.node })
      .populate(POPULATE_OPTION)
      .exec()
      .then(ret => {
        ctx.body = ret
      }).catch(err => {
        ctx.body = err
      })
  },
  userPost: async (ctx, next) => {
    await Post.find({ author_name: ctx.params.name })
      .populate(POPULATE_OPTION)
      .exec()
      .then(ret => {
        ctx.body = ret
      }).catch(err => {
        ctx.body = err
      })
  }
}
