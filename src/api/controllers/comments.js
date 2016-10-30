import Comment from '../models/comments'
import Post from '../models/posts'
import User from '../models/users'
import { AUTHOR_POPULATE_OPTION } from '../consts'

export default {
  addComment: async (ctx, next) => {
    const comment = new Comment(Object.assign({}, ctx.request.body, {
      pid: ctx.params.pid,
      uid: ctx.state.user._id
    }))
    try {
      await comment.save()
        .then(ret => {
          return Comment.populate(ret, AUTHOR_POPULATE_OPTION)
        }).then(ret => {
          ctx.body = ret
        })

      await Post.findByIdAndUpdate(
        ctx.params.pid,
        { $inc: { 'meta.comments': 1 } },
        { new: true }
      )

      await User.findByIdAndUpdate(
        ctx.state.user._id,
        { $inc: { 'meta.comments': 1 } },
        { new: true }
      )
    } catch (err) {
      ctx.body = err
    }
  },
  deleteComment: async (ctx, next) => {
    if (!ctx.state.user.node_admin) {
      ctx.throw('May the force be with u.')
    }
    try {
      let comment = await Comment.findByIdAndUpdate(
        ctx.params.cid, {
          $set: { hidden: true }
        }, {
          new: true
        }
      )
      let post = await Post.findById(comment.pid)
      if (ctx.state.user.owned_nodes.indexOf(post.node_name) === -1) {
        ctx.throw('no force detected.')
      }

      await Post.findByIdAndUpdate(
        ctx.params.pid,
        { $inc: { 'meta.comments': -1 } },
        { new: true }
      )

      await User.findByIdAndUpdate(
        ctx.state.user._id,
        { $inc: { 'meta.comments': -1 } },
        { new: true }
      )
    } catch (err) {
      ctx.body = err
    }
  },
  voteComment: async (ctx, next) => {
    const type = ctx.query.type || 'upvote'
    let item = {}
    if (type === 'upvote') {
      item = { upvotes: ctx.state.user.name }
    } else {
      item = { downvotes: ctx.state.user.name }
    }

    await Comment.findByIdAndUpdate(
      ctx.params.cid,
      { $addToSet: item },
      { new: true }
    )
      .populate(AUTHOR_POPULATE_OPTION)
      .exec()
      .then(ret => {
        ctx.body = ret
      })
  },
  listPostComment: async (ctx, next) => {
    await Comment
      .paginate({ pid: ctx.params.pid }, ctx.query)
      .populate(AUTHOR_POPULATE_OPTION)
      .exec()
      .then(ret => {
        ctx.body = ret
      }).catch(err => {
        ctx.body = err
      })
  },
  listUserComment: async (ctx, next) => {
    let opt = Object.assign({}, ctx.query, { sort: { created_at: -1 } })
    await Comment
      .paginate({ author_name: ctx.params.name }, opt)
      .populate(AUTHOR_POPULATE_OPTION)
      .exec()
      .then(ret => {
        ctx.body = ret
      }).catch(err => {
        ctx.body = err
      })
  }
}
