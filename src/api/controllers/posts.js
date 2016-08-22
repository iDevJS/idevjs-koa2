import marked from 'marked'
import Post from '../models/posts'

export default {
  getPost: async (ctx, next) => {
    const post = await Post.find({_id: ctx.params.pid})
    ctx.body = post
  },
  addPost: async (ctx, next) => {
    const post = new Post(ctx.request.body)
    console.log(post)
    try {
      await post.save()
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

