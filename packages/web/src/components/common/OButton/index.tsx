import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import type { FC } from 'react'

type OLoadingButtonProps = LoadingButtonProps

export const OButton: FC<OLoadingButtonProps> = ({ ...rest }) => {
  return <LoadingButton {...rest} />
}
