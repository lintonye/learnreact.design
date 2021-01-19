import * as React from 'react'
import { Frame, useCycle } from 'framer'

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

export function SimpleToggle() {
  const [anim, cycle] = useCycle([{ x: 0 }, { x: 71 - 28 }])

  return (
    <Frame
      onTap={() => cycle()}
      width={71}
      height={28}
      background="#BFBFBF"
      borderRadius={28}
      position="relative"
      shadow="0 2px 5px 0 rgba(0,0,0,.25)"
    >
      <Frame
        animate={anim}
        transition={{ duration: 0.2 }}
        size={26}
        left={1}
        top={1}
        borderRadius={28}
        background="white"
      />
    </Frame>
  )
}
