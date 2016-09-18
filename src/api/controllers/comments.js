import marked from 'marked'
import Comment from '../models/comments'

const USER_SELECT = 'name gravatar meta'
const POPULATE_OPTION = [
  {
    path: 'author', select: USER_SELECT
  }
]

export default {
  postComment: async (ctx, next) => {
    const query = ctx.query
    let opt = {pid: ctx.params.pid}
    opt.limit = query.limit || 30

    await Comment
      .find(opt)
      .populate(POPULATE_OPTION)
      .exec()
      .then(ret => {
        ctx.body = ret
      }).catch(err => {
        ctx.body = err
      })
  },
  userComment: async (ctx, next) => {
    const query = ctx.query
    let opt = {author_name: ctx.params.name}
    opt.limit = query.limit || 30

    await Comment
      .find(opt)
      .populate(POPULATE_OPTION)
      .exec()
      .then(ret => {
        ctx.body = ret
      }).catch(err => {
        ctx.body = err
      })
  }
}
