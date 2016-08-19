import Router from 'koa-router'
import posts from './posts'
import users from './users'
import nodes from './nodes'
import settings from './settings'
import notifications from './notifications'

const router = new Router()

router
  .use('/post', posts.routes(), posts.allowedMethods())
  .use('/user', users.routes(), users.allowedMethods())
  .use('/node', nodes.routes(), nodes.allowedMethods())
  .use('/setting', settings.routes(), settings.allowedMethods())
  .use('/notification', notifications.routes(), notifications.allowedMethods())

export default router
