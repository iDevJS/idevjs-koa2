import Router from 'koa-router'
import posts from '../controllers/posts'
import comments from '../controllers/comments'

const router = new Router()

router
  .get('/', posts.listPost)
  .post('/', posts.addPost)
  .get('/:pid', posts.getPost)
  .put('/:pid', posts.updatePost)
  .get('/:pid/comments', comments.postComment)

export default router
