import { Box, BoxProps } from '@mui/material'
import type { FC, ReactNode } from 'react'

export type OFormLabelProps = {
  children: ReactNode
} & BoxProps<'label'>

export const OFormLabel: FC<OFormLabelProps> = ({ ...rest }) => {
  return <Box component="label" fontWeight={'bold'} {...rest} />
}
