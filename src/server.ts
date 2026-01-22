import { app } from './app'
import { env } from './config/env'
import { baseLogger } from './lib/logger'

const port = env.PORT

const server = app.listen(port, () => {
  baseLogger.info(
    {
      port,
      env: env.NODE_ENV,
    },
    'server.started'
  )
})

// Graceful shutdown
const shutdown = (signal: string) => {
  baseLogger.info({ signal }, 'server.shutdown')
  server.close(() => {
    process.exit(0)
  })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
