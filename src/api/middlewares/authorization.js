import Redis from '../controllers/redis'
import Token from '../models/tokens'
import { TOKEN_POPULATE_OPTION } from '../consts'

export default () => {
  return async (ctx, next) => {
    let headerToken = ctx.get('authorization')
    let bearerToken = headerToken && headerToken.match(/Bearer\s(\S+)/)[1]
    if (bearerToken) {
      let token = await Redis.cache.token.get(bearerToken)
      if (!token) {
        token = await Token.findOne({
          access_token: bearerToken
        })
          .populate(TOKEN_POPULATE_OPTION)

        if (token) {
          Redis.cache.token.set(bearerToken, token)

        }
      } else {
        token = JSON.parse(token)
      }
      ctx.state.accessToken = token
      ctx.state.client = token.client
      ctx.state.user = token.user
    }
    await next()
  }
}
