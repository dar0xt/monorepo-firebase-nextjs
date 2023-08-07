import { z } from 'zod'

export const postFormSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(100),
})

export type PostFormSchema = z.infer<typeof postFormSchema>
