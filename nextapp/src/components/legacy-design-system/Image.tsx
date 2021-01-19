import * as React from 'react'
import { Box } from '.'

export default function Image({ src, size = undefined, ...props }) {
  const images = Array.isArray(src) ? src : [src]
  return (
    <Box
      width={size}
      height={size}
      {...props}
      backgroundImage={images.map((src) => `url(${src})`)}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    />
  )
}
