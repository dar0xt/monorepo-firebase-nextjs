import { TextField, TextFieldProps } from '@mui/material'
import type { FC } from 'react'

export type OTextFieldProps = TextFieldProps

export const OTextField: FC<OTextFieldProps> = ({ ...rest }) => {
  return <TextField {...rest} />
}
