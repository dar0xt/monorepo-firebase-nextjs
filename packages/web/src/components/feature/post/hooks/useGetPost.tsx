import { functions } from '@/components/functional/firebase/FirebaseDelegate'
import { useQuery } from '@tanstack/react-query'
import { httpsCallable } from 'firebase/functions'
import { GetPostRequest, GetPostResponse, functionKeys } from 'shared'

const callableFunction = httpsCallable<GetPostRequest, GetPostResponse>(
  functions,
  functionKeys.getPost
)

export const useGetPost = (arg: { postId: string }) => {
  const query = useQuery({
    queryKey: [functionKeys.getPost, arg],
    queryFn: async () => {
      const res = await callableFunction(arg)
      return res.data
    },
  })
  return query
}
