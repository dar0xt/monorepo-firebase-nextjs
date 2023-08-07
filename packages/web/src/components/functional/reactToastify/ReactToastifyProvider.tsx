import type { FC, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type ReactToastifyProviderProps = {
  children: ReactNode
}

export const ReactToastifyProvider: FC<ReactToastifyProviderProps> = ({
  children,
}) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  )
}
