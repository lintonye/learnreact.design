import { useEffect, useState } from 'react'
import {
  motion,
  MotionValue,
  transform,
  useTransform,
  useViewportScroll,
} from 'framer-motion'

function useViewportDimension() {
  const [dim, setDim] = useState({ width: 0, height: 0 })
  useEffect(() => {
    function updateDim() {
      setDim({ width: window.innerWidth, height: window.innerHeight })
    }
    updateDim()
    const listener = () => updateDim()
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [])
  return dim
}

function useViewportBoundingBox(id: string): [DOMRect | undefined, number] {
  const [boundingBox, setBoundingBox] = useState<DOMRect>()
  const [stickyTop, setStickyTop] = useState(0)
  useEffect(() => {
    const element = document.getElementById(id)
    function updateBox() {
      const box = element?.getBoundingClientRect()
      if (element && box) {
        setBoundingBox(
          DOMRectReadOnly.fromRect({
            x: box.x,
            y: box.y + window.scrollY,
            width: box.width,
            height: box.height,
          }),
        )
        const style = window.getComputedStyle(element)
        if (style.position === 'sticky') {
          setStickyTop(element.offsetTop)
        }
      }
    }
    updateBox()
    if (element) {
      const observer = new ResizeObserver(updateBox)
      observer.observe(element)
      return () => observer.disconnect()
    }
  }, [id])
  return [boundingBox, stickyTop]
}

export function Connection({
  idLeft,
  idRight,
}: {
  idLeft: string
  idRight: string
}) {
  const { width: windowWidth, height: windowHeight } = useViewportDimension()
  const [boxLeft] = useViewportBoundingBox(idLeft)
  const [boxRight, topThreshold] = useViewportBoundingBox(idRight)
  const endpointRadius = 6
  const { scrollY } = useViewportScroll()
  const yLeft = useTransform(scrollY, (sy) =>
    boxLeft ? boxLeft.top + boxLeft.height / 2 - sy : 0,
  )
  const outlinePadding = 0
  const outlineY = useTransform(scrollY, (sy) =>
    boxLeft ? boxLeft.top - sy - outlinePadding : 0,
  )
  const yRight = useTransform(scrollY, (sy) => {
    // console.log({ sy, topThreshold, top: boxRight.top + boxRight.height / 2 })
    return boxRight
      ? boxRight.top +
          boxRight.height / 2 -
          (sy > topThreshold ? topThreshold : sy)
      : 0
  })
  // @ts-ignore Not sure why the line below gives type error
  const opacity = useTransform<number, number>([yLeft, yRight], ([yl, yr]) => {
    const input = [0, 100, windowHeight - 100, windowHeight]
    const output = [0, 1, 1, 0]
    return Math.min(transform(yl, input, output), transform(yr, input, output))
  })
  return boxLeft && boxRight ? (
    <motion.svg
      className="absolute inset-0 text-blue-400"
      viewBox={`0 0 ${windowWidth} ${windowHeight}`}
      style={{ opacity }}
    >
      {/* Line */}
      <motion.line
        x1={boxLeft.right}
        x2={boxRight.left}
        y1={yLeft}
        y2={yRight}
        stroke="currentColor"
        strokeDasharray="4 4"
      />
      {/* Outline left */}
      <motion.rect
        x={0}
        y={0}
        width={boxLeft.width + outlinePadding * 2}
        height={boxLeft.height + outlinePadding * 2}
        stroke="currentColor"
        strokeWidth={2}
        strokeDasharray="4 4"
        rx={5}
        fill="transparent"
        style={{ y: outlineY, x: boxLeft.x - outlinePadding }}
      />
      {/* Left endpoint */}
      <motion.circle
        cx={boxLeft.right}
        cy={0}
        r={endpointRadius}
        strokeWidth={2}
        stroke="currentColor"
        fill="white"
        style={{ y: yLeft }}
      />
      {/* Right endpoint */}
      <motion.circle
        cx={boxRight.left}
        cy={0}
        r={endpointRadius}
        strokeWidth={2}
        stroke="currentColor"
        fill="white"
        style={{ y: yRight }}
      />
    </motion.svg>
  ) : null
}
