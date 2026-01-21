import pino from 'pino'
import { env } from '../config/env'
import { getRequestContext } from './requestContext'

export const baseLogger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  redact: {
    paths: ['req.headers.authorization', 'req.body.password'],
    remove: true,
  },
})

export const getLogger = () => {
  const ctx = getRequestContext()
  return ctx ? baseLogger.child({ requestId: ctx.requestId, userId: ctx.userId }) : baseLogger
}
