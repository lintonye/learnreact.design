import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
  AnimatePresence,
  useAnimation,
} from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useViewportDimension } from '@/components/useViewportDimension'
import spaceShipPng from './images/inside-spaceship.png'
import reactStarPng from './images/react-star.png'
import bgPng from './images/map-bg.png'
import inkPng from './images/ink.png'
import modelPng1_1 from './images/1.1.png'
import modelPng1_2 from './images/1.2.png'
import modelPng1_4 from './images/1.4.png'
import modelPng1_5 from './images/1.5.png'
import modelPng1_6 from './images/1.6.png'
import modelPng1_7 from './images/1.7.png'
import modelPng2_1 from './images/2.1.png'
import modelPng2_2 from './images/2.2.png'
import modelPng2_3 from './images/2.3.png'
import modelPng2_4 from './images/2.4.png'
import modelPng2_5 from './images/2.5.png'
import modelPng2_6 from './images/2.6.png'
import modelPng3_2 from './images/3.2.png'
import modelPng3_3 from './images/3.3.png'
import modelPng3_4 from './images/3.4.png'
import modelPng3_5 from './images/3.5.png'
import modelPng3_6 from './images/3.6.png'
import modelPng3_7 from './images/3.7.png'
import modelPng3_8 from './images/3.8.png'

const bgWidth = 2372
const bgHeight = 2000
const bgFactor = 4
const sections = [
  { id: '1.1', modelImage: modelPng1_1, x: 62, y: 238 },
  { id: '1.2', modelImage: modelPng1_2, x: 583, y: 22 },
  { id: '1.4', modelImage: modelPng1_4, x: 583, y: 312 },
  { id: '1.5', modelImage: modelPng1_5, x: 500, y: 621 },
  { id: '1.6', modelImage: modelPng1_6, x: 375, y: 657 },
  { id: '1.7', modelImage: modelPng1_7, x: 840, y: 867 },
  { id: '2.1', modelImage: modelPng2_1, x: 1221, y: 717 },
  { id: '2.2', modelImage: modelPng2_2, x: 1406, y: 600 },
  { id: '2.3', modelImage: modelPng2_3, x: 1834, y: 461 },
  { id: '2.4', modelImage: modelPng2_4, x: 1842, y: 270 },
  { id: '2.5', modelImage: modelPng2_5, x: 1955, y: 311 },
  { id: '2.6', modelImage: modelPng2_6, x: 1937, y: 262 },
  { id: '3.2', modelImage: modelPng3_2, x: 1920, y: 1502 },
  { id: '3.3', modelImage: modelPng3_3, x: 1885, y: 1663 },
  { id: '3.4', modelImage: modelPng3_4, x: 1732, y: 1642 },
  { id: '3.5', modelImage: modelPng3_5, x: 1153, y: 1523 },
  { id: '3.6', modelImage: modelPng3_6, x: 1013, y: 1565 },
  { id: '3.7', modelImage: modelPng3_7, x: 869, y: 1502 },
  { id: '3.8', modelImage: modelPng3_8, x: 621, y: 1681 },
]
const sectionTransitionDuration = 1

function usePreloadImages() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const allImages = [
      spaceShipPng,
      reactStarPng,
      bgPng,
      inkPng,
      ...sections.map((section) => section.modelImage),
    ]
    const loaded = new Set()
    for (let imgUrl of allImages) {
      const img = new window.Image()
      img.src = imgUrl
      img.onload = () => {
        loaded.add(imgUrl)
        if (loaded.size > 6) setLoading(false)
      }
    }
  }, [])
  return loading
}

function MentalModelMap() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [sectionIndex, setSectionIndex] = useState(0)
  const { width: vw, height: vh } = useViewportDimension()

  useEffect(() => {
    const { x: centerX, y: centerY } = sections[sectionIndex]
    const height = (vw * bgHeight) / bgWidth
    const toX = (centerX / bgWidth) * vw * bgFactor - vw / 2
    const toY = (centerY / bgHeight) * height * bgFactor - height / 2
    animate(x, -Math.max(Math.min(toX, vw * bgFactor), 0), {
      duration: sectionTransitionDuration,
    })
    animate(y, -Math.max(Math.min(toY, height * bgFactor), 0), {
      duration: sectionTransitionDuration,
    })
  }, [sectionIndex])

  return (
    <>
      <motion.div
        className="bg-no-repeat absolute left-0 top-0"
        style={{
          backgroundImage: `url(${bgPng})`,
          backgroundSize: `${100}%`,
          width: bgFactor * vw,
          height: (bgFactor * vw * bgHeight) / bgWidth,
          x,
          y,
          // backgroundPosition,
          // backgroundOrigin: 'border-box',
        }}
      >
        {sections.slice(0, sectionIndex + 1).map((section, i) => (
          <motion.img
            key={section.id}
            src={inkPng}
            className="absolute left-0 top-0"
            initial={{ opacity: 0, scale: 5 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { delay: sectionTransitionDuration },
            }}
            style={{
              width: 100,
              x: (section.x * bgFactor * vw) / bgWidth,
              y: (section.y * bgFactor * vw) / bgWidth,
            }}
            width={184}
            height={197}
          />
        ))}
      </motion.div>
      <input
        className="relative"
        type="number"
        autoFocus
        min={0}
        max={sections.length - 1}
        value={sectionIndex}
        onChange={(e) => setSectionIndex(e.target.valueAsNumber || 0)}
      />
      <motion.div
        className="absolute m-auto inset-0 border-8 border-gray-700 rounded-lg shadow-xl"
        style={{
          width: 600,
          height: 500,
          transformOrigin: 'center bottom',
        }}
        key={sectionIndex}
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { delay: sectionTransitionDuration + 0.3 },
        }}
        exit={{ scale: 0, opacity: 1 }}
      >
        <Image
          src={sections[sectionIndex].modelImage}
          width={600}
          height={500}
        />
      </motion.div>
    </>
  )
}

function Beginning() {
  const container = useAnimation()
  const spaceship = useAnimation()
  const star = useAnimation()
  const map = useAnimation()
  const [journeyStarted, setJourneyStarted] = useState(false)
  const { width: vw, height: vh } = useViewportDimension()
  useEffect(() => {
    async function animateIt() {
      await star.start({ opacity: 1, transition: { delay: 0.5, duration: 1 } })
      await spaceship.start({
        opacity: 1,
        transition: { delay: 0.5, duration: 1.5 },
      })
      await container.start({ scale: 16, transition: { duration: 5 } })
      container.start({ opacity: 0 })
      await map.start({ opacity: 1 })
      await map.start({ scale: bgFactor })
    }
    if (journeyStarted) animateIt()
  }, [journeyStarted])
  return (
    <motion.div
      className="h-full relative"
      style={{
        backgroundColor: '#131532',
        originX: '75.8%',
        originY: `${vw / 3.12}px`,
      }}
      animate={container}
    >
      <AnimatePresence>
        {!journeyStarted ? (
          <motion.div
            key="initial"
            className="flex flex-col justify-center items-center h-full gap-8 text-gray-100"
            exit={{ opacity: 0 }}
          >
            <motion.h1 className="text-5xl">坐标 React 星</motion.h1>
            <motion.h2 className="text-2xl">
              一本伪装成小说的 React 开发指南
            </motion.h2>
            <motion.button
              className="rounded-3xl border-2 border-gray-100 px-8 py-2 text-2xl hover:border-blue-400 hover:text-blue-400"
              onClick={() => setJourneyStarted(true)}
            >
              起 航
            </motion.button>
          </motion.div>
        ) : (
          <>
            <motion.img
              src={reactStarPng}
              className="absolute top-0 left-0 w-full"
              initial={{ opacity: 0 }}
              animate={star}
            />
            <motion.img
              src={spaceShipPng}
              className="absolute top-0 left-0 w-full"
              initial={{ opacity: 0 }}
              animate={spaceship}
            />
            <motion.img
              src={bgPng}
              className="absolute top-0 left-0 w-full origin-top-left"
              initial={{ opacity: 0 }}
              animate={map}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function BookPreview() {
  const isLoading = usePreloadImages()
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Beginning />
          {/* <MentalModelMap /> */}
        </>
      )}
    </div>
  )
}
