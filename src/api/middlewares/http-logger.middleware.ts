import pinoHttp from 'pino-http'

import { baseLogger } from '../../lib/logger'
import { getRequestContext } from '../../lib/request-context'

export const httpLoggerMiddleware = pinoHttp({
  logger: baseLogger,
  customProps: () => {
    const ctx = getRequestContext()
    return ctx ? { requestId: ctx.requestId, userId: ctx.userId } : {}
  },
})
