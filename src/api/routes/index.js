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
  .use('/posts', posts.routes(), posts.allowedMethods())
  .use('/users', users.routes(), users.allowedMethods())
  .use('/nodes', nodes.routes(), nodes.allowedMethods())
  .use('/comments', comments.routes(), comments.allowedMethods())
  .use('/settings', settings.routes(), settings.allowedMethods())
  .use('/notifications', notifications.routes(), notifications.allowedMethods())

export default router
