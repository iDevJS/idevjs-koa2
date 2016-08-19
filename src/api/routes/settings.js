import Router from 'koa-router'
import settings from '../controllers/settings'
const router = new Router()

router
  .get('/', settings.getSetting)
  .post('/', settings.updateSetting)

export default router
