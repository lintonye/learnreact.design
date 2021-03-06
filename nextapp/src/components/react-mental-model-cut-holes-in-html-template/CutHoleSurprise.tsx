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
      aria-label="Metaphor animation: a person behind a cardboard hole taking pictures"
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
          alt="Person behind the cardboard"
        />
      </motion.div>

      <Image
        src={imgBoard}
        width={361 * scale}
        height={486 * scale}
        layout="fixed"
        alt="cardboard with a hole"
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
          alt="camera man"
        />
      </motion.div>

      {/* Flash */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          revealed: {
            // opacity: 1,
            // scale: 0.5,
            opacity: [1, 1, 0],
            scale: [0.5, 2.5, 2.5],
            transition: {
              delay: 0.9,
              duration: 0.2,
              repeat: 1,
              repeatDelay: 0.1,
              repeatType: 'loop',
            },
          },
        }}
        className="absolute"
        css={{
          top: 35,
          left: -20,
        }}
      >
        <Image
          src={imgFlash}
          width={250 * scale}
          height={220 * scale}
          layout="fixed"
          alt="flash"
        />
      </motion.div>
    </motion.div>
  )
}
