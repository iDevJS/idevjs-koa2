import Router from 'koa-router'
import posts from './posts'
import users from './users'
import nodes from './nodes'
import comments from './comments'
import settings from './settings'
import notifications from './notifications'
import Init from '../controllers/init'

const router = new Router()

router
  .get('/init', Init)
  .use('/post', posts.routes(), posts.allowedMethods())
  .use('/user', users.routes(), users.allowedMethods())
  .use('/node', nodes.routes(), nodes.allowedMethods())
  .use('/comment', comments.routes(), comments.allowedMethods())
  .use('/setting', settings.routes(), settings.allowedMethods())
  .use('/notification', notifications.routes(), notifications.allowedMethods())

export default router
