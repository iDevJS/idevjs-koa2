import Router from 'koa-router'
import posts from './posts'
import users from './users'
import nodes from './nodes'

const router = new Router()

router
  .use('/post', posts.routes(), posts.allowedMethods())
  .use('/user', users.routes(), users.allowedMethods())
  .use('/node', nodes.routes(), nodes.allowedMethods())

export default router
