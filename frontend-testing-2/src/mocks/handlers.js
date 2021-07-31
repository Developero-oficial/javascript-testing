import {rest} from 'msw'
import jwt from 'jsonwebtoken'

import {baseApiUrl} from '../config'

export const handlers = [
  rest.post(`${baseApiUrl}/login`, (req, res, ctx) => {
    const token = jwt.sign({email: 'johana.doe@mail.com'}, 'secret')
    return res(ctx.status(200), ctx.json({token}))
  }),
  rest.get(`${baseApiUrl}/products`, (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.post(`${baseApiUrl}/products`, (req, res, ctx) => {
    return res(ctx.status(200))
  }),
]
