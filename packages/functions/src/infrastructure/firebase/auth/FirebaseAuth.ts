import { Auth, getAuth } from 'firebase-admin/auth'
import { inject, injectable } from 'tsyringe'
import { FirebaseApp } from '../app/FirebaseApp'

@injectable()
export class FirebaseAuth {
  public readonly auth: Auth
  constructor(@inject('FirebaseApp') app: FirebaseApp) {
    this.auth = getAuth(app.app)
  }
}
