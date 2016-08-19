import Koa from 'koa'
import logger from 'koa-logger'
import compress from 'koa-compress'
import mongoose from 'mongoose'
import config from '../../config'
import log from './middlewares/logger'
import error from './middlewares/error'
import router from './routes/index'

mongoose.connect(`mongodb:${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`)
mongoose.connection.on('error', console.error)

const env = process.env.NODE_ENV || 'development'
const api = new Koa()

if (env !== 'test') api.use(logger())
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
    data: 'welcome to idevjs.com api server'
  }
})

export default api
