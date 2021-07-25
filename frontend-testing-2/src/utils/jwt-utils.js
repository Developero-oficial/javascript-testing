import jwt_decode from 'jwt-decode'

export const decodeJwt = token => jwt_decode(token)
