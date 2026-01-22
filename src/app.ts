import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { errorHandlerMiddleware } from './api/middlewares/error-handler.middleware'
import { httpLoggerMiddleware } from './api/middlewares/http-logger.middleware'
import { notFoundMiddleware } from './api/middlewares/not-found.middleware'
import { apiRateLimitMiddleware } from './api/middlewares/rate-limit.middleware'
import { requestContextMiddleware } from './api/middlewares/request-context.middleware'
import { apiRouter } from './api/routes'
import { env } from './config/env'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(helmet())
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
)

// Request context + logging
app.use(requestContextMiddleware)
app.use(httpLoggerMiddleware)

app.use('/api', apiRateLimitMiddleware)

const API_PREFIX = '/api/v1'

app.use(API_PREFIX, apiRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
