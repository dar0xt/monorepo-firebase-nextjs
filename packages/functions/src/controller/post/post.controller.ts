import { FirebaseFunctions } from '@/infrastructure/firebase/functions/FirebaseFunctions'
import { PostService } from '@/service/post/post.service'
import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostRequest,
  DeletePostResponse,
  GetAllPostRequest,
  GetAllPostResponse,
  GetPostRequest,
  GetPostResponse,
  UpdatePostRequest,
  UpdatePostResponse,
  createPostRequestSchema,
  createPostResponseSchema,
  deletePostRequestSchema,
  getAllPostResponseSchema,
  getPostRequestSchema,
  getPostResponseSchema,
  updatePostRequestSchema,
} from 'shared'
import { container, inject, injectable } from 'tsyringe'

@injectable()
export class PostController {
  constructor(
    @inject('FirebaseFunctions') private functions: FirebaseFunctions,
    @inject('PostService') private service: PostService
  ) {}

  get() {
    return this.functions.onCall<GetPostRequest, GetPostResponse>(
      async (request) => {
        const { postId } = getPostRequestSchema.parse(request.data)
        const post = await this.service.get(postId)
        return getPostResponseSchema.parse(post)
      }
    )
  }
  getAll() {
    return this.functions.onCall<GetAllPostRequest, GetAllPostResponse>(
      async () => {
        const posts = await this.service.getAll()
        return getAllPostResponseSchema.parse(posts)
      }
    )
  }
  create() {
    return this.functions.onCall<CreatePostRequest, CreatePostResponse>(
      async (request) => {
        const data = createPostRequestSchema.parse(request.data)
        const post = await this.service.create(data)
        return createPostResponseSchema.parse(post)
      }
    )
  }
  update() {
    return this.functions.onCall<UpdatePostRequest, UpdatePostResponse>(
      async (request) => {
        const data = updatePostRequestSchema.parse(request.data)
        await this.service.update(data)
        return
      }
    )
  }
  delete() {
    return this.functions.onCall<DeletePostRequest, DeletePostResponse>(
      async (request) => {
        const { postId } = deletePostRequestSchema.parse(request.data)
        await this.service.delete(postId)
        return
      }
    )
  }
}

const controller = container.resolve(PostController)
export const getPost = controller.get()
export const getAllPosts = controller.getAll()
export const createPost = controller.create()
export const updatePost = controller.update()
export const deletePost = controller.delete()
