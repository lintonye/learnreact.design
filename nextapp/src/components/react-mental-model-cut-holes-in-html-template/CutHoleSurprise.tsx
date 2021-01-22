import { jsx } from '@emotion/core'
import Image from 'next/image'
import React from 'react'
import imgBoard from './boardOnly.png'
import imgMan from './dataManOnly.png'
import { motion } from 'framer-motion'

export function CutHoleSurprise({ autoPlay = false }: { autoPlay: boolean }) {
  const scale = 0.3
  return (
    <div className="relative">
      <motion.div
        animate={autoPlay ? 'revealed' : 'hidden'}
        variants={{
          hidden: { x: 100 },
          revealed: { x: 0, transition: { delay: 0.3 } },
        }}
        className="absolute"
        css={{
          top: 40,
          left: 30,
        }}
      >
        <Image
          src={imgMan}
          width={409 * scale}
          height={333 * scale}
          layout="fixed"
        />
      </motion.div>
      <Image
        src={imgBoard}
        width={361 * scale}
        height={486 * scale}
        layout="fixed"
      />
    </div>
  )
}
