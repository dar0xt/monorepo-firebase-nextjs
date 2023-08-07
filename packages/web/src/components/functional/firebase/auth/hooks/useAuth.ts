import { useContext } from 'react'
import { FirebaseAuthContext } from '../context/FirebaseAuthContext'

export const useAuth = () => {
  const user = useContext(FirebaseAuthContext)
  return { user }
}
