import Router from 'koa-router'
import comments from '../controllers/comments'

const router = new Router()

router
  .post('/:cid', comments.voteComment)
  .del('/:cid', comments.deleteComment)

export default router
