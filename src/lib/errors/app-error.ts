import { ErrorCodes } from './error-codes'

export type AppError = {
  statusCode: number
  code: string
  message: string
  details?: unknown
}


export const errors = {
  validation: (details?: unknown): AppError => ({
    statusCode: 400,
    code: ErrorCodes.VALIDATION,
    message: 'Validation failed',
    details,
  }),

  badRequest: (message = 'Bad request', details?: unknown): AppError => ({
    statusCode: 400,
    code: ErrorCodes.BAD_REQUEST,
    message,
    details,
  }),

  unauthorized: (message = 'Unauthorized'): AppError => ({
    statusCode: 401,
    code: ErrorCodes.UNAUTHORIZED,
    message,
  }),

  forbidden: (message = 'Forbidden'): AppError => ({
    statusCode: 403,
    code: ErrorCodes.FORBIDDEN,
    message,
  }),

  notFound: (message = 'Resource not found'): AppError => ({
    statusCode: 404,
    code: ErrorCodes.NOT_FOUND,
    message,
  }),

  conflict: (message = 'Conflict'): AppError => ({
    statusCode: 409,
    code: ErrorCodes.CONFLICT,
    message,
  }),

  internal: (message = 'Internal server error', details?: unknown): AppError => ({
    statusCode: 500,
    code: ErrorCodes.INTERNAL,
    message,
    details,
  }),
}
