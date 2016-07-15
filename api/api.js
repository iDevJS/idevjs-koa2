import http from 'http'
import path from 'path'
import Koa from 'koa'
import views from 'koa-views'

const app = new Koa()

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// error handler
app.use(async (ctx, next) => {
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
app.on('error', async (err, ctx) => {
  console.log('error occured:', err)
})

app.use(ctx => {
    ctx.body = 'hello koa2'
})

app.listen(3000)
export default app