import marked from 'marked'
import Post from '../models/posts'

export default {
  getPost: async (ctx, next) => {
    await Post.find({ _id: ctx.params.pid }).exec().then(ret => {
      ctx.body = ret
    }).catch(err => {
      console.log(err)
    })
  },
  addPost: async (ctx, next) => {
    const post = new Post(ctx.request.body)
    try {
      await post.save().then((ret) => {
        console.log(ret)
      }).catch(err => {
        console.log(err)
      })
    } catch (err) {
      ctx.throw(422, err.message)
    }
    ctx.body = post
  },
  updatePost: async (ctx, next) => {

  },
  listPost: async (ctx, next) => {
    ctx.body = 'post list'
  },
  nodePost: async (ctx, next) => {

  },
  userPost: async (ctx, next) => {

  }
}

