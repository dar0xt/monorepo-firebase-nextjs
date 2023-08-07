import { User, signInAnonymously } from 'firebase/auth'
import { ReactNode, useEffect, useState, type FC } from 'react'
import { auth } from '../FirebaseDelegate'
import { FirebaseAuthContext } from './context/FirebaseAuthContext'

export type FirebaseAuthProviderProps = {
  children: ReactNode
}

export const FirebaseAuthProvider: FC<FirebaseAuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  useEffect(() => {
    const subscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        const credential = await signInAnonymously(auth)
        setUser(credential.user)
        return
      }
      setUser(user)
    })
    return subscribe
  }, [])

  return (
    <FirebaseAuthContext.Provider value={user}>
      {children}
    </FirebaseAuthContext.Provider>
  )
}
