import Router from 'koa-router'
import notifications from '../controllers/notifications'

const router = new Router()

router
  .get('/', notifications.listNotification)
  .put('/all', notifications.markAllNotification)
  .get('/:nid', notifications.getNotification)
  .put('/:nid', notifications.markNotification)

export default router
