import {rest} from 'msw'

import {baseApiUrl} from '../config'

export const handlers = [
  rest.post(`${baseApiUrl}/login`, (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.get(`${baseApiUrl}/products`, (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.post(`${baseApiUrl}/products`, (req, res, ctx) => {
    return res(ctx.status(200))
  }),
]
