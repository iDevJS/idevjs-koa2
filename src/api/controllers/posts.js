import marked from 'marked'
import Post from '../models/posts'
import Node from '../models/nodes'
import {POST_POPULATE_OPTION} from '../consts'

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
      }).catch(err => {
        ctx.body = err
      })
  },
  addPost: async (ctx, next) => {
    const post = new Post(ctx.request.body)
    try {
      await post.save()
        .then(ret => {
          return Post.populate(ret, POST_POPULATE_OPTION)
        })
        .then(ret => {
          ctx.body = ret
        })

      await Node.findOneAndUpdate({
        name: ctx.request.body.node_name
      },
        {
          $inc: {
            'meta.posts': 1
          }
        }, {
          new: true
        })
    } catch (err) {
      ctx.body = err
    }
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
      .populate(POST_POPULATE_OPTION)
      .exec()
      .then(ret => {
        ctx.body = ret
      }).catch(err => {
        ctx.body = err
      })
  },
  deletePost: async (ctx, next) => {
    try {
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
      await Node.findOneAndUpdate({
        name: ctx.request.body.node_name
      },
        {
          $inc: {
            'meta.posts': -1
          }
        }, {
          new: true
        })
    } catch (err) {
      ctx.body = err
    }
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
