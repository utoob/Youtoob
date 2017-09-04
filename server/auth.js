import jwt from 'express-jwt'
import { SECRET } from './config'

/* (req) is an express request object
 * For example:
 * {
 *   headers: { authorization: 'Token blah.blah.blah' },
 *   // Other properties
 * }
 */

const getTokenFromHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Token'
  ) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

/* These functions returns a middleware that'll
 * check if api request contains an authorization header
 */

export const required = jwt({
  secret: SECRET,
  getToken: getTokenFromHeader
})

export const optional = jwt({
  secret: SECRET,
  getToken: getTokenFromHeader,
  credentialsRequired: false
})