import Router from 'koa-router'
import nodes from '../controllers/nodes'

const router = new Router()

router
  .get('/', nodes.nodeData)
  .get('/post', nodes.nodePost)

export default router
