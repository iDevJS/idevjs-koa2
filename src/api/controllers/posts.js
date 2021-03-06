import marked from 'marked'
import User from '../models/users'
import Post from '../models/posts'
import Node from '../models/nodes'
import { POST_POPULATE_OPTION } from '../consts'

const updateUserPostCount = async (name, num) => {
  await User.findOneAndUpdate({
    name: name
  }, {
    $inc: {
      'meta.posts': num
    }
  }, {
    new: true
  })
}

const updateNodePostCount = async (name, num) => {
  await Node.findOneAndUpdate({
    name: name
  }, {
    $inc: {
      'meta.posts': num
    }
  }, {
    new: true
  })
}

export default {
  getPost: async (ctx, next) => {
    const query = ctx.query
    await Post.findByIdAndUpdate(
      ctx.params.pid,
      {
        $inc: { 'meta.views': 1 }
      }, {
        new: true
      }
    )
      .populate(POST_POPULATE_OPTION)
      .exec()
      .then(ret => {
        if (query.content_format !== 'markdown') {
          ret.content = marked(ret.content)
        }
        ctx.body = ret
      })
    await next()
  },
  addPost: async (ctx, next) => {
    const post = new Post({
      ...ctx.request.body,
      author_name: ctx.state.user.name,
      client_id: ctx.state.client._id
    })
    await post.save()
    .then(ret => {
      return Post.populate(ret, POST_POPULATE_OPTION)
    })
    .then(ret => {
      ctx.body = ret
    })

    await updateNodePostCount(ctx.request.body.node_name, 1)
    await updateUserPostCount(ctx.state.user.name, 1)
   
    await next()
  },
  updatePost: async (ctx, next) => {
    const body = ctx.request.body
    let post = Post.findById(
      ctx.params.pid
    )
    if (post.author_name !== ctx.state.user.name) {
      ctx.body = 'no force'
      return
    }
    await Post.findByIdAndUpdate(
      ctx.params.pid, {
        $set: {
          title: body.title,
          content: body.content,
          node_name: body.node_name,
          tab: body.tab,
          updated_at: Date.now()
        }
      }, {
        new: true
      })
      .populate(POST_POPULATE_OPTION)
      .exec()
      .then(ret => {
        ctx.body = ret
      }).catch(err => {
        ctx.body = err
      })
  },
  deletePost: async (ctx, next) => {
    await Post.findByIdAndUpdate(
      ctx.params.pid,
      {
        $set: {
          hidden: true
        }
      }, {
        new: true
      }
    ).then(ret => {
      ctx.body = ret
    })

    await updateNodePostCount(ctx.request.body.node_name, -1)
    await updateUserPostCount(ctx.state.user.name, -1)

    await next()
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

    await Post
      .paginate({}, query)
      .populate(POST_POPULATE_OPTION)
      .select({ content: 0 }) // no content
      .exec()
      .then(ret => {
        ctx.body = ret
      })
      .catch(err => {
        ctx.body = err
      })
  },
  listNodePost: async (ctx, next) => {
    const query = ctx.query
    await Post
      .paginate({ node_name: ctx.params.node }, query)
      .populate(POST_POPULATE_OPTION)
      .exec()
      .then(ret => {
        ctx.body = ret
      }).catch(err => {
        ctx.body = err
      })
  },
  listUserPost: async (ctx, next) => {
    const opt = Object.assign({}, ctx.query, { tab: 'new' })
    await Post
      .paginate({ author_name: ctx.params.name }, opt)
      .populate(POST_POPULATE_OPTION)
      .exec()
      .then(ret => {
        ctx.body = ret
      }).catch(err => {
        ctx.body = err
      })
  }
}
