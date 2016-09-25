import Router from 'koa-router'
import nodes from '../controllers/nodes'
import posts from '../controllers/posts'

const router = new Router()

router
  .get('/:node', nodes.nodeDetail)
  .get('/:node/post', posts.listNodePost)

export default router
