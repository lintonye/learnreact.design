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
import mapBgPng from './images/map-bg.png'
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
import useSound from 'use-sound'

const bgWidth = 2372
const bgHeight = 2000
const bgFactor = 4
const sections = [
  { id: '1.1', modelImage: modelPng1_1, x: 62, y: 238 },
  { id: '1.2', modelImage: modelPng1_2, x: 583, y: 22 },
  { id: '1.4', modelImage: modelPng1_4, x: 533, y: 312 },
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
const sectionTransitionDuration = 2

function usePreloadImages() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const allImages = [
      spaceShipPng,
      reactStarPng,
      mapBgPng,
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

type PathsProps = {
  animatePathIndex: number
} & React.SVGProps<SVGSVGElement>

function Paths({ animatePathIndex, ...props }: PathsProps) {
  const activeAnimate = {
    pathLength: 1,
    transition: { duration: sectionTransitionDuration - 0.2 },
  }
  const paths = [
    {
      d:
        'M86 251C86 251 109.451 233.826 126 225.5C158.54 209.128 181.665 213.165 216 201C255.208 187.109 272.54 166.652 313 157C347.277 148.823 368.763 158.842 403 150.5C447.374 139.688 468.023 121.084 508 99C540.976 80.7832 601 41 601 41',
      stroke: '#F064A4',
    },
    {
      d:
        'M602.5 44C602.5 44 615 122.5 581.5 153C540.633 190.207 428.234 198.537 392.5 268.5C378.517 295.876 354.5 329.5 375.5 344.5C384.398 350.856 458.312 320.811 469 318.5C524.5 306.5 551.5 333 551.5 333',
      stroke: '#F064A4',
    },
    {
      d:
        'M552.5 333.5C552.5 333.5 509.568 437.924 525 503.5C538.867 562.426 527.19 643.246 514.5 641.5',
      stroke: '#F064A4',
    },
    {
      d: 'M513.5 643.5C456.523 617.828 430.428 628.149 390.5 674.5',
      stroke: '#F064A4',
    },
    {
      d:
        'M389.5 676C412.085 680.479 428.684 783.727 445.5 820C460.608 852.589 490.828 857.205 526 864.5C617.266 883.429 657 848.5 737.5 858C785.104 863.618 856 890 856 890',
      stroke: '#F064A4',
    },
    {
      d:
        'M858.5 889.5C840.654 897.097 1039.45 921.957 1080.5 810C1093.19 775.402 1074.48 733.486 1038.5 725.5C975.717 711.563 947.214 694.599 967 611C972.875 586.178 932.593 571.787 945 549.5C957.743 526.611 986.809 527.447 1011 537.5C1041.52 550.183 1032.5 540.5 1100.5 571.5C1168.5 602.5 1237.5 738.5 1237.5 738.5',
      stroke: '#F064A4',
    },
    {
      d: 'M1237.5 738.5C1305.29 686.76 1345.78 660.936 1425.5 624.5',
      stroke: '#F8DD5E',
    },
    {
      d:
        'M1428 623C1485 612 1442.52 433.986 1518 423C1593.48 412.014 1756.14 439.352 1851 481.5',
      stroke: '#F8DD5E',
    },
    {
      d: 'M1851.5 480C1839.21 404.97 1829.41 362.895 1859 288',
      stroke: '#F8DD5E',
    },
    {
      d: 'M1860.5 285.5C1898.02 328.729 1919 329.395 1970 326',
      stroke: '#F8DD5E',
    },
    { d: 'M1975 324L1951 290.5', stroke: '#F8DD5E' },
    {
      d:
        'M1951 291C1951 291 1931.92 269.522 1920 255.5C1873.78 201.136 1906 551 1889 585C1872 619 1874.91 821.365 1952 938.5C1974.55 972.771 2028.82 994.925 2018 1034.5C2015.01 1045.44 2017.57 1047.37 1995.5 1066.5C1973.43 1085.63 1948.15 1081.28 1938 1103.5M1938 1213.5C1938 1213.5 1951.86 1233.78 1952 1248.5C1952.44 1295.62 1897.91 1317.24 1903.5 1370.5C1908.5 1418.06 1940.39 1440.24 1938 1488C1937.28 1502.4 1932.5 1524.5 1932.5 1524.5',
      stroke: '#F8DD5E',
    },
    {
      d:
        'M1935 1527.5C1935 1527.5 1940.58 1562.65 1935 1584C1926.68 1615.85 1883.88 1626 1884.5 1651.5C1884.85 1666.01 1895.5 1687 1895.5 1687',
      stroke: '#374DA1',
    },
    {
      d:
        'M1896.5 1690C1896.5 1690 1897.28 1727.29 1880.5 1737C1864.41 1746.31 1850.05 1737.96 1833.5 1729.5C1808.13 1716.54 1816.85 1683.44 1792 1669.5C1776.26 1660.67 1747 1659 1747 1659',
      stroke: '#374DA1',
    },
    {
      d:
        'M1744 1659C1736.08 1648.05 1607 1568.82 1539 1572.5C1478.42 1575.78 1444.05 1606.92 1385 1593C1305.79 1574.32 1172.91 1536.26 1167 1551',
      stroke: '#374DA1',
    },
    {
      d: 'M1162 1551C1115.22 1577.51 1086.84 1584.94 1031.5 1582',
      stroke: '#374DA1',
    },
    {
      d: 'M1028.5 1583C975.705 1545.99 944.19 1536 886.5 1526.5',
      stroke: '#374DA1',
    },
    {
      d:
        'M883 1527.5C880.919 1518.66 865.5 1567.81 826.5 1596C780.256 1629.42 788.5 1625.5 763.5 1643C720.397 1673.17 676.5 1678.5 640 1701',
      stroke: '#374DA1',
    },
  ]
  return (
    <svg
      width="2372"
      height="2000"
      viewBox="0 0 2372 2000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {paths.map((path, i) => (
        <motion.path
          key={i}
          initial={{ pathLength: -1 }}
          animate={animatePathIndex >= i + 1 ? activeAnimate : {}}
          strokeWidth="8"
          strokeLinejoin="round"
          strokeLinecap="round"
          {...path}
        />
      ))}
    </svg>
  )
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
          backgroundImage: `url(${mapBgPng})`,
          backgroundSize: `${100}%`,
          width: bgFactor * vw,
          height: (bgFactor * vw * bgHeight) / bgWidth,
          x,
          y,
          // backgroundPosition,
          // backgroundOrigin: 'border-box',
        }}
      >
        <Paths className="w-full h-full" animatePathIndex={sectionIndex} />
        {sections.slice(0, sectionIndex + 1).map((section, i) => (
          <>
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
          </>
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

function Beginning({
  onAnimationEnd,
  onAnimationStart,
}: {
  onAnimationStart: () => void
  onAnimationEnd: () => void
}) {
  const container = useAnimation()
  const spaceship = useAnimation()
  const star = useAnimation()
  const map = useAnimation()
  const [journeyStarted, setJourneyStarted] = useState(false)
  const { width: vw, height: vh } = useViewportDimension()

  useEffect(() => {
    async function animateIt() {
      typeof onAnimationStart === 'function' && onAnimationStart()
      await star.start({ opacity: 1, transition: { delay: 0.5, duration: 1 } })
      await spaceship.start({
        opacity: 1,
        transition: { delay: 0.5, duration: 1.5 },
      })
      await container.start({ scale: 16, transition: { duration: 5 } })
      container.start({ opacity: 0, transition: { duration: 1.5 } })
      await map.start({ opacity: 1, transition: { duration: 1.5 } })
      await map.start({ scale: bgFactor, transition: { duration: 1.5 } })
      typeof onAnimationEnd === 'function' && onAnimationEnd()
    }
    if (journeyStarted) animateIt()
  }, [journeyStarted])
  return (
    <motion.div
      className="h-full relative"
      style={{ backgroundColor: '#131532' }}
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
            <motion.div
              className="h-full relative"
              style={{
                originX: '75.8%',
                originY: `${vw / 3.12}px`,
              }}
              animate={container}
            >
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
            </motion.div>
            <motion.img
              src={mapBgPng}
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
  const [showBeginning, setShowBeginning] = useState(true)
  const [playBgMusic] = useSound('/bgmusic.mp3')
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <AnimatePresence>
        {isLoading ? (
          <div>Loading...</div>
        ) : showBeginning ? (
          <motion.div className="h-full" exit={{ opacity: 0 }}>
            <Beginning
              onAnimationEnd={() => setShowBeginning(false)}
              onAnimationStart={() => playBgMusic()}
            />
          </motion.div>
        ) : (
          <MentalModelMap />
        )}
      </AnimatePresence>
    </div>
  )
}
