import { jsx } from '@emotion/core'
import Image from 'next/image'
import React from 'react'
import imgBoard from './boardOnly.png'
import imgMan from './dataManOnly.png'
import imgCameraMan from './cameramanOnly.png'
import imgFlash from './flash.png'
import { motion } from 'framer-motion'

export function CutHoleSurprise({ autoPlay = false }: { autoPlay: boolean }) {
  const scale = 0.3 // }>
  return (
    <motion.div
      className="relative"
      initial="hidden"
      animate={autoPlay ? 'revealed' : 'hidden'}
    >
      <motion.div
        variants={{
          hidden: { x: 100 },
          revealed: { x: 0, transition: { delay: 0.3 } },
        }}
        className="absolute"
        css={{
          top: 40,
          left: 36,
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

      {/* Camera man */}
      <motion.div
        variants={{
          hidden: { x: -200, opacity: 0 },
          revealed: { x: 0, opacity: 1, transition: { delay: 0.6 } },
        }}
        className="absolute"
        css={{
          top: 50,
          left: -70,
        }}
      >
        <Image
          src={imgCameraMan}
          width={279 * scale}
          height={402 * scale}
          layout="fixed"
        />
      </motion.div>

      {/* Flash */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          revealed: { opacity: 1, transition: { delay: 0.9, duration: 0.1 } },
        }}
        className="absolute"
        css={{
          top: 40,
          left: 0,
        }}
      >
        <Image
          src={imgFlash}
          width={121 * scale}
          height={154 * scale}
          layout="fixed"
        />
      </motion.div>
    </motion.div>
  )
}
