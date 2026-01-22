import type { RequestHandler } from 'express'

import { errors } from '../../lib/errors/app-error'

export const notFoundMiddleware: RequestHandler = (_req, _res, next) => {
  next(errors.notFound())
}
