import type { ErrorRequestHandler } from 'express'

import { ZodError } from 'zod'

import { env } from '../../config/env'
import { errors } from '../../lib/errors/app-error'
import { getLogger } from '../../lib/logger'

export const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const log = getLogger()

  const normalized = err instanceof ZodError ? errors.validation(err.issues) : err

  const isOurError =
    normalized &&
    typeof normalized === 'object' &&
    'statusCode' in normalized &&
    'code' in normalized &&
    'message' in normalized

  const statusCode = isOurError ? (normalized as any).statusCode : 500
  const code = isOurError ? (normalized as any).code : 'INTERNAL'
  const message = isOurError ? (normalized as any).message : 'Internal server error'
  const details = isOurError ? (normalized as any).details : undefined

  if (statusCode >= 500) log.error({ err: normalized, code }, 'request.failed')
  else log.warn({ err: normalized, code }, 'request.error')

  const payload: any = { code, message }
  if (details) payload.details = details
  if (env.NODE_ENV !== 'production' && statusCode === 500)
    payload.stack = (normalized as any)?.stack

  res.status(statusCode).json(payload)
}
