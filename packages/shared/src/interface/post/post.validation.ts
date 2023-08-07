
import { z } from "zod"

// attributes
const postId = z.string()
const title = z.string()
const content = z.nullable(z.string())
const createdAt = z.date()
const updatedAt = z.date()

// Get
export const getPostRequestSchema = z.object({
  postId
})
export const getPostResponseSchema = z.nullable(
  z.object({
   postId,
title,
content,
createdAt: createdAt.transform((date) => date.toISOString()),
updatedAt: updatedAt.transform((date) => date.toISOString()),
  })
)
// GetAll
export const getAllPostRequestSchema = z.void()
export const getAllPostResponseSchema = z.array(
  z.object({
   postId,
title,
content,
createdAt: createdAt.transform((date) => date.toISOString()),
updatedAt: updatedAt.transform((date) => date.toISOString()),
  })
)

// Create
export const createPostRequestSchema = z.object({
  
title,
content,


})
export const createPostResponseSchema = z.object({
  postId
})

// Update
export const updatePostRequestSchema = z.object({
  postId,
title: z.optional(title),
content: z.optional(content),


})
export const updatePostResponseSchema = z.void()

// Delete
export const deletePostRequestSchema = z.object({
  postId
})
export const deletePostResponseSchema = z.void()

// Type
export type GetPostRequest = z.infer<typeof getPostRequestSchema>
export type GetPostResponse = z.infer<typeof getPostResponseSchema>
export type GetAllPostRequest = z.infer<typeof getAllPostRequestSchema>
export type GetAllPostResponse = z.infer<typeof getAllPostResponseSchema>
export type CreatePostRequest = z.infer<typeof createPostRequestSchema>
export type CreatePostResponse = z.infer<typeof createPostResponseSchema>
export type UpdatePostRequest = z.infer<typeof updatePostRequestSchema>
export type UpdatePostResponse = z.infer<typeof updatePostResponseSchema>
export type DeletePostRequest = z.infer<typeof deletePostRequestSchema>
export type DeletePostResponse = z.infer<typeof deletePostResponseSchema>

