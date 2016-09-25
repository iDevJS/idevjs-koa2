import Router from 'koa-router'
import posts from '../controllers/posts'
import comments from '../controllers/comments'

const router = new Router()

router
  .get('/', posts.listPost)
  .post('/', posts.addPost)
  .get('/:pid/comment', comments.listPostComment)
  .post('/:pid/comment', comments.addComment)
  .get('/:pid', posts.getPost)
  .put('/:pid', posts.updatePost)
  .del('/:pid', posts.deletePost)

export default router
