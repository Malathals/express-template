import type { RequestHandler } from 'express'

import { nanoid } from 'nanoid'

import { baseLogger } from '../../lib/logger'
import { runWithRequestContext } from '../../lib/request-context'

export const requestContextMiddleware: RequestHandler = (req, res, next) => {
  const incoming = req.header('x-request-id')
  const requestId = incoming && incoming.trim() ? incoming : nanoid()

  res.setHeader('x-request-id', requestId)

  runWithRequestContext({ requestId }, () => {
    baseLogger.debug({ requestId, method: req.method, path: req.path }, 'request.start')

    res.on('finish', () => {
      baseLogger.info(
        { requestId, statusCode: res.statusCode, method: req.method, path: req.path },
        'request.end'
      )
    })

    next()
  })
}
