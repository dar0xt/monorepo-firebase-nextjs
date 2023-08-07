import { FirebaseFirestore } from '@/infrastructure/firebase/firestore/FirebaseFirestore'
import { inject, injectable } from 'tsyringe'
import { CreatePostDTO, UpdatePostDTO } from './post.dto'

@injectable()
export class PostService {
  constructor(
    @inject('FirebaseFirestore') private firestore: FirebaseFirestore
  ) {}

  async get(postId: string) {
    const post = await this.firestore.post.collection.doc(postId).get()
    const data = post.data()
    return data ?? null
  }
  async getAll() {
    const post = await this.firestore.post.collection.get()
    const data = post.docs.map((doc) => doc.data())
    return data
  }
  async create(dto: CreatePostDTO) {
    const createdAt = new Date()
    const updatedAt = new Date()

    const doc = await this.firestore.post.collection.add({
      ...dto,
      createdAt,
      updatedAt,
    })
    return {
      postId: doc.id,
    }
  }
  async update(dto: UpdatePostDTO) {
    const updatedAt = new Date()
    await this.firestore.post.collection.doc(dto.postId).update({
      ...dto,
      updatedAt,
    })
    return
  }
  async delete(postId: string) {
    await this.firestore.post.collection.doc(postId).delete()
    return
  }
}
