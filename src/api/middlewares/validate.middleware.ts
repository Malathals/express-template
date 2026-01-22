import type { RequestHandler } from 'express'
import type { ZodSchema } from 'zod'

import { errors } from '../../lib/errors/app-error'

type Schemas = {
  body?: ZodSchema
  query?: ZodSchema
  params?: ZodSchema
}

export const validateMiddleware = (schemas: Schemas): RequestHandler => {
  return (req, _res, next) => {
    const body = schemas.body?.safeParse(req.body)
    const query = schemas.query?.safeParse(req.query)
    const params = schemas.params?.safeParse(req.params)

    const issues = [
      body && !body.success ? { part: 'body', errors: body.error.issues } : null,
      query && !query.success ? { part: 'query', errors: query.error.issues } : null,
      params && !params.success ? { part: 'params', errors: params.error.issues } : null,
    ].filter(Boolean)

    if (issues.length) return next(errors.validation(issues))

    if (body?.success) req.body = body.data
    if (query?.success) req.query = query.data as any
    if (params?.success) req.params = params.data as any

    next()
  }
}

