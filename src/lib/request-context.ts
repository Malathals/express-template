import { AsyncLocalStorage } from 'node:async_hooks'


export type RequestContextData = {
  requestId: string
  userId?: string
}


const requestContextStorage = new AsyncLocalStorage<RequestContextData>()


export const runWithRequestContext = (
  context: RequestContextData,
  callback: () => void
) => {
  requestContextStorage.run(context, callback)
}


export const getRequestContext = (): RequestContextData | undefined =>
  requestContextStorage.getStore()
