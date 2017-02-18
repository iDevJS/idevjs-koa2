import Redis from '../controllers/redis'

const config = {
  token: {
    limit: 50,
    remaining: 50,
    expires: 60
  },
  ip: {
    limit: 1000,
    remaining: 1000,
    expires: 3600
  }
}

export default () => {
  return async (ctx, next) => {
    let accessToken = ctx.state.accessToken
    let limitType, typeName
    if (accessToken) {
      limitType = 'token'
      typeName = accessToken.access_token
    } else {
      limitType = 'ip'
      typeName = ctx.ip
    }

    let ratelimit = await Redis.ratelimit.get(typeName)
    if (Object.keys(ratelimit).length > 0) {
      if (+ratelimit.remaining < 0) {
        ctx.throw('ratelimit:outofuse')
      }
      Redis.ratelimit.decr(typeName)
    } else {
      ratelimit = config[limitType]
      Redis.ratelimit.set(typeName, ratelimit.limit, ratelimit.expires)
    }

    await next()

    ctx.set({
      'X-RateLimit-Limit': ratelimit.limit,
      'X-RateLimit-Remaining': ratelimit.remaining - 1,
      'X-RateLimit-Reset': ratelimit.expires
    })
  }
}
