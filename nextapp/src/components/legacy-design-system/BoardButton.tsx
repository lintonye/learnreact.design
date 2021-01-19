import * as React from 'react'
import { motion } from 'framer-motion'
import { RocketArrow, SmallFlame, BigFlame } from './canvas'

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

export function BoardButton({ onTap, ...props }) {
  const [variant, setVariant] = React.useState('normal')
  const containerVariants = {
    hover: {
      borderColor: '#FFF',
      background: 'rgba(255,255,255,0.05)',
      // borderWidth: 2,
      transition: { duration: 1, delay: 0.5 },
      color: '#FFF',
      // transition: { yoyo: Infinity },
    },
    normal: {
      // borderWidth: 1,
      background: 'rgba(255,255,255,0)',
      borderColor: 'rgba(255,255,255,0.3)',
      color: '#ddd',
    },
  }
  const flameVariants = {
    hover: {
      scale: [1.5, 1],
      transition: { yoyo: Infinity },
    },
    normal: { scale: 1 },
  }
  return (
    <motion.div
      {...props}
      onTap={() => onTap && onTap()}
      style={{
        width: 240,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        background: 'transparent',
        borderRadius: 50,
        border: '1px solid rgba(255,255,255,0.3)',
      }}
      variants={containerVariants}
      animate={variant}
      initial="normal"
      onHoverStart={() => {
        setVariant('hover')
      }}
      onHoverEnd={() => {
        setVariant('normal')
      }}
    >
      <motion.div
        style={{
          height: '100%',
          width: 45,
          position: 'relative',
        }}
        variants={{
          hover: {
            y: [3, 0],
            transition: { yoyo: Infinity, duration: 3 },
          },
          normal: { y: 0 },
        }}
      >
        <RocketArrow
          style={{ marginRight: 8, position: 'absolute', top: 5 }}
          variants={{
            hover: { rotate: -90 },
            normal: { rotate: 0 },
          }}
        />
        <motion.div
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            left: 6,
            top: 10,
            overflow: 'hidden',
          }}
          variants={{
            hover: {
              height: 50,
              transition: {
                // delay: 0.2,
                duration: 0.5,
                ease: 'easeIn',
              },
            },
            normal: { height: 0 },
          }}
        >
          <SmallFlame
            style={{ position: 'absolute', top: 10, left: 0 }}
            variants={flameVariants}
          />
          <BigFlame
            style={{ position: 'absolute', top: 20, left: 10 }}
            variants={flameVariants}
          />
          <SmallFlame
            style={{ position: 'absolute', top: 10, left: 23 }}
            variants={flameVariants}
          />
        </motion.div>
      </motion.div>
      {props.children || 'BOARD NOW'}
    </motion.div>
  )
}
