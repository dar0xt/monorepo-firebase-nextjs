import { PostModel } from '@/domain/post/post.model'
import { Firestore, FirestoreDataConverter } from 'firebase-admin/firestore'
import { IFirestoreCollection } from '../IFirebaseCollection'

export class FirestorePostCollection
  implements IFirestoreCollection<PostModel>
{
  constructor(private readonly firestore: Firestore) {}
  get converter() {
    const converter: FirestoreDataConverter<PostModel> = {
      toFirestore: (model) => ({
        title: model.title,
        content: model.content,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
      }),
      fromFirestore: (snapshot) => {
        const data = snapshot.data()
        return {
          postId: snapshot.id,
          title: data.title,
          content: data.content,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        }
      },
    }
    return converter
  }
  get collection() {
    return this.firestore.collection('posts').withConverter(this.converter)
  }
}
