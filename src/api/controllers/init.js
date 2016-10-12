import User from '../models/users'
import Token from '../models/tokens'
import Client from '../models/clients'

export default async (ctx, next) => {
  try {
    let user = new User({
      _id: '559a0409b42711a2fd32904f',
      name: 'xuhong',
      email: '710200711@qq.com',
      password: '$2a$10$DTx1nZVWkNEIawLSgcTK..93dOQbOdLXutpPDFXnB/e4CN/52E4gC',
      avatar_url: 'https://avatars1.githubusercontent.com/u/1656327?v=3&s=460'
    })
    await user.save()
      .then(ret => {

      })
    let client = new Client({
      client_secret: 'rx7qIVXMnX5nZwLN',
      scope: 'post:7,comment:7,user:7',
      name: 'idevjs-angular2',
      alias: 'iDevJS-Angular2',
      bio: 'offical',
      site_uri: 'https://www.getpostman.com/oauth2/callback',
      redirect_uri: 'https://www.getpostman.com/oauth2/callback'
    })
    await client.save()
      .then(ret => {

      })
    let token = new Token({
      access_token: 'cfd6275cb154ddb57d18f544544d72475f959964',
      token_type: 'bearer',
      scope: 'post:7,comment:7,user:7',
      client_id: client._id,
      refresh_token: '56981598e24ff6cf58fbae4183990efb30e69cf2',
      username: 'xuhong',
      expires_at: '1579354412871'
    })
    await token.save()
      .then(ret => {

      })

  } catch (err) {
    ctx.body = err
  }
}
