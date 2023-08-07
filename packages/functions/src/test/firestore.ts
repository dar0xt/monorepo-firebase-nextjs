import { Config } from '@/config/Config'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FirestoreTestManager {
  constructor(@inject('Config') private config: Config) {}
  async clearData(projectId: string = this.config.PROJECT_ID) {
    // doc: https://firebase.google.com/docs/emulator-suite/connect_firestore?hl=ja#clear_your_database_between_tests
    const url = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${projectId}/databases/(default)/documents`
    await fetch(url, { method: 'DELETE' })
  }
}
