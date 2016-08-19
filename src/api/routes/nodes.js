import Router from 'koa-router'
import nodes from '../controllers/nodes'

const router = new Router()

router
  .get('/:node', nodes.nodeDetail)
  .get('/:node/post', nodes.nodePost)

export default router
