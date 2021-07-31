import {rest} from 'msw'
import jwt from 'jsonwebtoken'

import {baseApiUrl} from '../config'

export const handlers = [
  rest.post(`${baseApiUrl}/login`, (req, res, ctx) => {
    const {email} = req.body

    if (email === 'test.errordoe@mail.com') {
      return res(ctx.status(500))
    }

    const token = jwt.sign({email: 'johana.doe@mail.com'}, 'secret')
    return res(ctx.status(200), ctx.json({token}))
  }),
  rest.get(`${baseApiUrl}/products`, (req, res, ctx) => {
    const singleProduct = {
      _id: 'abc',
      name: 'test',
      description: 'pass',
      size: 1,
    }
    const products = [singleProduct]
    return res(ctx.status(200), ctx.json({products}))
  }),
  rest.post(`${baseApiUrl}/products`, (req, res, ctx) => {
    return res(ctx.status(200))
  }),
]
