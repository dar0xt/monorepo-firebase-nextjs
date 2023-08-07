'use client'

import { type FC, type ReactNode } from 'react'
import { FirebaseAuthProvider } from './auth/FirebaseAuthProvider'

export type FirebaseProviderProps = {
  children: ReactNode
}

export const FirebaseProvider: FC<FirebaseProviderProps> = ({ children }) => {
  return <FirebaseAuthProvider>{children}</FirebaseAuthProvider>
}
