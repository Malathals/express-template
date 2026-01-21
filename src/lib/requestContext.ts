import { AsyncLocalStorage } from 'node:async_hooks'

export type RequestContext = {
  requestId: string
  userId?: string
}

const als = new AsyncLocalStorage<RequestContext>()

export const withRequestContext = (ctx: RequestContext, fn: () => void) => {
  als.run(ctx, fn)
}

export const getRequestContext = () => als.getStore()
