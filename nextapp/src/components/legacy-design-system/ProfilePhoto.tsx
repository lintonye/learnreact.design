import * as React from 'react'
import { Box } from '.'

type PhotoParams = {
  size: number | number[]
  url: string
}
export default function ProfilePhoto({
  size = 100,
  url,
  ...rest
}: PhotoParams) {
  return (
    <Box
      backgroundImage={`url(${url})`}
      backgroundSize="cover"
      borderRadius="round"
      width={size}
      height={size}
      boxShadow="inset 0px 0px 20px 0 rgba(0, 0, 0, 0.4)"
      {...rest}
    />
  )
}
