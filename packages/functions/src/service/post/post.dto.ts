export type CreatePostDTO = {
  title: string
  content: string | null
}

export type UpdatePostDTO = {
  postId: string
  title?: string
  content?: string | null
  createdAt?: Date
  updatedAt?: Date
}
