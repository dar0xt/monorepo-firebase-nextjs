import { Config } from '@/config/Config'
import { App, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FirebaseApp {
  public readonly app: App
  constructor(@inject('Config') private config: Config) {
    const apps = getApps()
    if (apps.length === 0) {
      const firebaseConfig = this.getFirebaseConfig()
      this.app = initializeApp(firebaseConfig)
    }
    this.app = getApp()
  }
  private getFirebaseConfig() {
    return {
      apiKey: this.config.API_KEY,
      authDomain: this.config.AUTH_DOMAIN,
      projectId: this.config.PROJECT_ID,
      storageBucket: this.config.STORAGE_BUCKET,
      messagingSenderId: this.config.MESSAGING_SENDER_ID,
      appId: this.config.APP_ID,
      measurementId: this.config.MEASUREMENT_ID,
    }
  }
}
