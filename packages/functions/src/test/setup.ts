import '@/ioc'

import { container } from 'tsyringe'
import { FirestoreTestManager } from './firestore'

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080'

const firestoreTestManager = container.resolve(FirestoreTestManager)

beforeAll(async () => {
  await firestoreTestManager.clearData()
})

beforeEach(async () => {
  await firestoreTestManager.clearData()
})
