import Router from 'koa-router'
import auth from '../middlewares/authorization'
import posts from '../controllers/posts'
import comments from '../controllers/comments'

const router = new Router()

router
  .get('/', posts.listPost)
  .post('/', auth(), posts.addPost)
  .get('/:pid/comments', comments.listPostComment)
  .post('/:pid/comments', auth(), comments.addComment)
  .get('/:pid', posts.getPost)
  .put('/:pid', auth(), posts.updatePost)
  .del('/:pid', auth(), posts.deletePost)

export default router
