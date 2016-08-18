import http from 'http'
import path from 'path'
import Koa from 'koa'
import logger from 'koa-logger'
import compress from 'koa-compress'
import views from 'koa-views'
import log from './middlewares/logger'
import error from './middlewares/error'
import router from './routes/index'

const env = process.env.NODE_ENV || 'development'
const api = new Koa()

if ('test' != env) api.use(logger())
// logger
api.use(log)
// error handler
api.use(error)

api.on('error', async (err, ctx) => {
  console.log('error occured:', err)
})

api.use(router.routes())

api.use(compress())

api.use(ctx => {
  ctx.body = {
    data: "welcome to idevjs.com api server"
  }
})

export default api
