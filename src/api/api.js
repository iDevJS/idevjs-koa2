import http from 'http'
import path from 'path'
import Koa from 'koa'
import logger from 'koa-logger'
import compress from 'koa-compress'
import router from 'koa-router'
import views from 'koa-views'

const env = process.env.NODE_ENV || 'development'
const api = new Koa()

if ('test' != env) api.use(logger())
// logger
api.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// error handler
api.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      message: err.message
    }
  }
})
// error logger
api.on('error', async (err, ctx) => {
  console.log('error occured:', err)
})

api.use(compress())

api.use(ctx => {
  ctx.body = {
    data: "welcome to idevjs.com api server"
  }
})

export default api
