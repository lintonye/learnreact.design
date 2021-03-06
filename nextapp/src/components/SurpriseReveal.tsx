import React, { useState } from 'react'
import { motion, Variants } from 'framer-motion'

export function SurpriseReveal({
  surprise,
  children,
  animationVariants = {
    hidden: { x: 0, rotate: 180 },
    revealed: { x: -120, rotate: 0 },
  },
}: {
  surprise: React.ReactNode | ((revealEnded: boolean) => React.ReactNode)
  children: React.ReactNode
  animationVariants?: Variants
}) {
  const [animate, setAnimate] = useState<'hidden' | 'revealed'>('hidden')
  return (
    <motion.div
      animate={animate}
      className="relative border-l border-gray-300 pl-8"
      onMouseEnter={() => setAnimate('revealed')}
      onMouseLeave={() => setAnimate('hidden')}
    >
      <motion.div variants={animationVariants} className="absolute">
        {typeof surprise === 'function'
          ? surprise(animate === 'revealed')
          : surprise}
      </motion.div>
      <div className="absolute inset-0 bg-white" />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
