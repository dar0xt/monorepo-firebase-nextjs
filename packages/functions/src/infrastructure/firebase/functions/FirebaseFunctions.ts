import { Request, Response } from 'express'
import {
  CallableFunction,
  CallableOptions,
  CallableRequest,
  HttpsFunction,
  onCall,
  onRequest,
} from 'firebase-functions/v2/https'

const defaultOptions = {
  minInstances: 0,
  maxInstances: 10,
  region: 'asia-northeast1',
} as const

export class FirebaseFunctions {
  onCall<T = unknown, Return = unknown>(
    handler: (request: CallableRequest<T>) => Promise<Return>,
    opts: CallableOptions = defaultOptions
  ): CallableFunction<T, Promise<Return>> {
    return onCall(opts, handler)
  }

  onRequest(
    handler: (request: Request, response: Response) => Promise<void>,
    opts: CallableOptions = defaultOptions
  ): HttpsFunction {
    return onRequest(opts, handler)
  }
}
