import Koa from 'koa'
import logger from 'koa-logger'
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import mongoose from 'mongoose'
import config from './config/dev'
import authorization from './middlewares/authorization'
import ratelimit from './middlewares/ratelimit'
import errorMiddleware from './middlewares/error'
import router from './routes/index'

mongoose.connect(`mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`)
mongoose.connection.on('error', console.error)
mongoose.Promise = global.Promise

const env = process.env.NODE_ENV || 'development'
const api = new Koa()

if (env !== 'test') api.use(logger())
api.use(errorMiddleware())
api.use(cors())
api.use(bodyParser())
api.use(authorization())
api.use(ratelimit())
api.use(compress())
api.use(router.routes())

export default api
