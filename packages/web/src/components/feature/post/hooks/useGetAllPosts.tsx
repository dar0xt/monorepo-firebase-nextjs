import { functions } from '@/components/functional/firebase/FirebaseDelegate'
import { useQuery } from '@tanstack/react-query'
import { httpsCallable } from 'firebase/functions'
import { GetAllPostRequest, GetAllPostResponse, functionKeys } from 'shared'

const callableFunction = httpsCallable<GetAllPostRequest, GetAllPostResponse>(
  functions,
  functionKeys.getAllPosts
)

export const useGetAllPosts = () => {
  const query = useQuery({
    queryKey: [functionKeys.getAllPosts] as const,
    queryFn: async () => {
      const res = await callableFunction()
      return res.data
    },
  })
  return query
}
