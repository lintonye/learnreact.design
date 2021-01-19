import * as React from 'react'
import { motion, useCycle } from 'framer-motion'
import {
  KnobDay,
  KnobNight,
  TrackDay,
  TrackNight,
  FgDay,
  ShootingStar,
  Star,
} from './canvas'

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

function Clouds() {
  return (
    <motion.div
      variants={{
        light: {
          x: [5, -10],
          transition: { duration: 5, yoyo: Infinity },
        },
        dark: { x: -20 },
      }}
    >
      <motion.div
        variants={{
          light: { x: 0 },
          dark: { x: -20 },
        }}
        transition={{ type: 'spring', damping: 6 }}
      >
        <FgDay
          style={{ left: 40 }}
          variants={{
            light: { opacity: 1 },
            dark: { opacity: 0 },
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  )
}

function AnimatedStar({ size = 1, ...rest }) {
  return (
    <Star
      {...rest}
      scale={size}
      variants={{
        dark: {
          opacity: [1, 1, 0.5],
          transition: {
            duration: 1,
            yoyo: Infinity,
            times: [0, 0.9, 1],
          },
        },
      }}
    />
  )
}

function Stars() {
  return (
    <motion.div variants={{ light: { opacity: 0 }, dark: { opacity: 1 } }}>
      <motion.div
        variants={{
          dark: {
            transition: {
              staggerChildren: 0.5,
              delayChildren: 0.1,
            },
          },
        }}
      >
        <AnimatedStar style={{ left: -5, top: -5, scale: 0.6 }} />
        <AnimatedStar style={{ left: 4, top: 0, scale: 0.6 }} />
        <AnimatedStar style={{ left: 8, top: 5, scale: 0.6 }} />
      </motion.div>
      <motion.div
        variants={{
          light: { x: 20 },
          dark: { x: 0, transition: { staggerChildren: 1.3 } },
        }}
      >
        <AnimatedStar style={{ left: 2, top: 5 }} />
        <AnimatedStar style={{ left: 15, top: 0 }} />
      </motion.div>
    </motion.div>
  )
}

function AnimatedShootingStar({ top, left }) {
  return (
    <ShootingStar
      style={{ top, left }}
      variants={{
        dark: { scale: [0.3, 0, 0], x: [0, 30, 30], y: [0, 30, 30] },
      }}
      transition={{ duration: 8, loop: Infinity, times: [0, 0.1, 1] }}
    />
  )
}

function ShootingStars() {
  return (
    <motion.div
      variants={{
        dark: { opacity: 1, transition: { staggerChildren: 0.5 } },
        light: { opacity: 0 },
      }}
    >
      <AnimatedShootingStar top={-18} left={0} />
      <AnimatedShootingStar top={-18} left={5} />
      <AnimatedShootingStar top={-18} left={-15} />
    </motion.div>
  )
}

export function DayNightToggle({ initialMode, onChange }) {
  const modes = initialMode === 'dark' ? ['dark', 'light'] : ['light', 'dark']
  const [anim, cycle] = useCycle(...modes)
  const cycleMode = () => {
    cycle()
    onChange && onChange(anim === 'dark' ? 'light' : 'dark')
  }

  return (
    <motion.div
      initial={initialMode}
      animate={anim}
      onTap={() => {
        // move the knob
        cycleMode()
      }}
      style={{
        cursor: 'pointer',
        width: 70,
        height: 28,
        borderRadius: 28,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <TrackDay
        variants={{
          light: { opacity: 1, x: 0 },
          dark: { opacity: 0, x: -3 },
        }}
      />
      <TrackNight
        variants={{
          light: { opacity: 0, x: 0 },
          dark: { opacity: 1, x: -3 },
        }}
      />
      <Clouds />
      <Stars />
      <ShootingStars />
      <KnobDay
        variants={{
          light: { x: 0, opacity: 1 },
          dark: { x: 42, opacity: 0 },
        }}
        transition={{ duration: 0.3 }}
      />
      <KnobNight
        variants={{
          light: { x: -6, opacity: 0 },
          dark: { x: 34, opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
