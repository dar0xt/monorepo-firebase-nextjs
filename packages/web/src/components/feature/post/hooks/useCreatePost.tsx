import { functions } from '@/components/functional/firebase/FirebaseDelegate'
import { invalidateQueries } from '@/components/functional/tanStack/utils/invalidateQueries'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { httpsCallable } from 'firebase/functions'
import { toast } from 'react-toastify'
import { CreatePostRequest, CreatePostResponse, functionKeys } from 'shared'

const callableFunction = httpsCallable<CreatePostRequest, CreatePostResponse>(
  functions,
  functionKeys.createPost
)

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: callableFunction,
    onSuccess: async () => {
      await invalidateQueries(queryClient, [
        functionKeys.getPost,
        functionKeys.getAllPosts,
      ])
      toast.success('Post created')
    },
    onError: () => {
      toast.error('Error occurred...')
    },
  })
  return mutation
}
