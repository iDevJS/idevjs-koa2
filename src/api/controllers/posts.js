import marked from 'marked'
import Post from '../models/posts'

export default {
  getPost: async (ctx, next) => {
    await Post.findByIdAndUpdate({ _id: ctx.params.pid }, { $inc: { 'meta.views': 1 } })
      .populate('author')
      .exec()
      .then(ret => {
        ctx.body = ret
      }).catch(err => {
        ctx.body = err
      })
  },
  addPost: async (ctx, next) => {
    const post = new Post(ctx.request.body)
    await post.save().then(ret => {
      ctx.body = ret
    }).catch(err => {
      ctx.body = err
    })
  },
  updatePost: async (ctx, next) => {
    await Post.findByIdAndUpdate({ _id: ctx.params.pid }).exec().then(ret => {
      ctx.body = ret
    }).catch(err => {
      ctx.body = err
    })
  },
  listPost: async (ctx, next) => {
    const query = ctx.query
    ctx.body = 'post list'
  },
  nodePost: async (ctx, next) => {
    await Post.find({ node: ctx.params.node }).exec().then(ret => {
      ctx.body = ret
    }).catch(err => {
      ctx.body = err
    })
  },
  userPost: async (ctx, next) => {
    await Post.find({ author: ctx.params.name }).exec().then(ret => {
      ctx.body = ret
    }).catch(err => {
      ctx.body = err
    })
  }
}
