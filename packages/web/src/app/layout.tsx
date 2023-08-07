import { FirebaseProvider } from '@/components/functional/firebase/FirebaseProvider'
import { MuiProvider } from '@/components/functional/mui/MuiProvider'
import { ReactToastifyProvider } from '@/components/functional/reactToastify/ReactToastifyProvider'
import { TanStackProvider } from '@/components/functional/tanStack/TanStackProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'firebase-monorepo-nextjs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FirebaseProvider>
          <TanStackProvider>
            <MuiProvider>
              <ReactToastifyProvider>{children}</ReactToastifyProvider>
            </MuiProvider>
          </TanStackProvider>
        </FirebaseProvider>
      </body>
    </html>
  )
}
