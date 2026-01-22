export const ErrorCodes = {
  VALIDATION: 'VALIDATION',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  CONFLICT: 'CONFLICT',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL: 'INTERNAL',
  BAD_REQUEST: 'BAD_REQUEST'
} as const

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes]
