import http from 'http'
import Koa from 'koa'
import mount from 'koa-mount'
import api from './api/api'
import auth from './auth/auth'
// import config from '../config'

const app = new Koa()
app.use(mount('/v2', api))
app.use(mount('/auth', auth))

const server = http.createServer(app.callback())
server.listen(8000)

export default app
