import Redis from 'ioredis'
export const redis = new Redis()

export default {
  ratelimit: {
    set: (name, limit, expires) => {
      redis.hmset(`ratelimit:${name}`, {
        limit: limit,
        remaining: limit - 1,
        expires: expires + Date.now()
      })
      redis.expire(`ratelimit:${name}`, expires)
    },
    get: (name) => {
      return redis.hgetall(`ratelimit:${name}`)
    },
    decr: (name) => {
      redis.hincrby(`ratelimit:${name}`, 'remaining', -1)
    }
  },
  cache: {
    token: {
      set: (name, token) => {
        redis.hset(`cache:token:${name}`, 'token', JSON.stringify(token))
      },
      get: (name) => {
        return redis.hget(`cache:token:${name}`, 'token')
      }
    }
  }
}
