import Router from 'koa-router'
import users from '../controllers/users'
import posts from '../controllers/posts'
import comments from '../controllers/comments'

const router = new Router()

router
  .get('/:name', users.getUser)
  .get('/:name/posts', posts.listUserPost)
  .get('/:name/comments', comments.listUserComment)

export default router
