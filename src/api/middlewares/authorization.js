import Client from '../models/clients'
import Token from '../models/tokens'
import { TOKEN_POPULATE_OPTION } from '../consts'

export default () => {
  return async (ctx, next) => {
    let clientId = ctx.query.client_id
    let headerToken = ctx.get('authorization')
    let bearerToken = headerToken && headerToken.match(/Bearer\s(\S+)/)[1]
    try {
      if (bearerToken) {
        await Token.findOne({
          access_token: bearerToken
        })
          .populate(TOKEN_POPULATE_OPTION)
          .then(ret => {
            ctx.state.access_token = ret
            ctx.state.client = ret.client
            ctx.state.user = ret.user
          })
      } else if (clientId) {
        await Client.findById(
          clientId
        ).then(ret => {
          ctx.state.client = ret
        })
      } else {
        ctx.throw('client_id or access_token required')
      }
      await next()
    } catch (err) {
      ctx.body = err
    }
  }
}
