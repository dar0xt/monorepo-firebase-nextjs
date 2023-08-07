import { Firestore, getFirestore } from 'firebase-admin/firestore'
import { inject, injectable } from 'tsyringe'
import { FirebaseApp } from '../app/FirebaseApp'
import { FirestorePostCollection } from './post/post.collection'

@injectable()
export class FirebaseFirestore {
  public readonly firestore: Firestore
  public readonly post: FirestorePostCollection

  constructor(@inject('FirebaseApp') app: FirebaseApp) {
    this.firestore = getFirestore(app.app)
    this.post = new FirestorePostCollection(this.firestore)
  }
}
