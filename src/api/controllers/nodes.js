import Node from '../models/nodes'
import marked from 'marked'

export default {
  list: async (ctx, next) => {
    await Node.find()
      .then(ret => {
        ctx.body = ret
      })
  },
  updateNode: async (ctx, next) => {
    const body = ctx.request.body
    await Node.findOneAndUpdate(
      {
        name: ctx.params.name
      }, {
        $set: {
          bio: body.bio
        }
      }).then(ret => {
        ctx.body = ret
      })
  },
  nodeDetail: async (ctx, next) => {
    await Node.findOne({
      name: ctx.params.name
    }).then(ret => {
      ret.content = marked(ret.content)
      ctx.body = ret
    })
  },
  addTab: async (ctx, next) => {
    let item = { tabs: ctx.request.body }
    await Node.findOneAndUpdate(
      {
        name: ctx.params.name
      }, {
        $addToSet: item
      }, {
        new: true
      })
  }
}
