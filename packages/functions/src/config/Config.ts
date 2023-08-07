import 'dotenv/config'

export class Config {
  API_KEY: string
  AUTH_DOMAIN: string
  PROJECT_ID: string
  STORAGE_BUCKET: string
  MESSAGING_SENDER_ID: string
  APP_ID: string
  MEASUREMENT_ID: string
  constructor() {
    this.API_KEY = this.defineString(process.env.API_KEY)
    this.AUTH_DOMAIN = this.defineString(process.env.AUTH_DOMAIN)
    this.PROJECT_ID = this.defineString(process.env.PROJECT_ID)
    this.STORAGE_BUCKET = this.defineString(process.env.STORAGE_BUCKET)
    this.MESSAGING_SENDER_ID = this.defineString(
      process.env.MESSAGING_SENDER_ID
    )
    this.APP_ID = this.defineString(process.env.APP_ID)
    this.MEASUREMENT_ID = this.defineString(process.env.MEASUREMENT_ID)
  }

  defineString(value: unknown): string {
    if (typeof value === 'string') {
      if (value.length === 0) {
        console.warn('Environment variable is empty string')
      }
      return value
    }
    throw new Error('Environment variable is not string')
  }
}
