'use client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { type FC, type ReactNode } from 'react'
import NextAppDirEmotionCacheProvider from './CacheProvider'
import { theme } from './theme'

export type MuiProviderProps = {
  children: ReactNode
}

export const MuiProvider: FC<MuiProviderProps> = ({ children }) => {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}
