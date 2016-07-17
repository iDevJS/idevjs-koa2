import http from 'http'
import path from 'path'
import Koa from 'koa'
import logger from 'koa-logger'
import compress from 'koa-compress'
import serve from 'koa-static'
import router from 'koa-router'
import views from 'koa-views'

const env = process.env.NODE_ENV || 'development'
const auth = new Koa()

// serve static
auth.use(serve('./asserts'))

// logger
if ('test' != env) auth.use(logger())
auth.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// error handler
auth.use(async (ctx, next) => {
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
auth.on('error', async (err, ctx) => {
  console.log('error occured:', err)
})

auth.use(compress())

auth.use(ctx => {
  ctx.body = {
    data: "welcome to idevjs.com auth server"
  }
})

export default auth
