import { useEffect, useState } from 'react'

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

function useViewportBoundingBox(id: string) {
  const [boundingBox, setBoundingBox] = useState<DOMRect>()
  useEffect(() => {
    const element = document.getElementById(id)
    function updateBox() {
      const box = element?.getBoundingClientRect()
      setBoundingBox(box)
    }
    updateBox()
    if (element) {
      const observer = new ResizeObserver(updateBox)
      observer.observe(element)
      return () => observer.disconnect()
    }
  }, [id])
  return boundingBox
}

export function Connection({
  idLeft,
  idRight,
}: {
  idLeft: string
  idRight: string
}) {
  const { width: windowWidth, height: windowHeight } = useViewportDimension()
  const boxLeft = useViewportBoundingBox(idLeft)
  const boxRight = useViewportBoundingBox(idRight)
  const endpointRadius = 10
  return boxLeft && boxRight ? (
    <svg
      className="absolute inset-0"
      viewBox={`0 0 ${windowWidth} ${windowHeight}`}
    >
      <circle
        cx={boxLeft.right - endpointRadius}
        cy={boxLeft.top + boxLeft.height / 2}
        r={endpointRadius}
        strokeWidth={2}
        stroke="red"
        fill="pink"
      />
    </svg>
  ) : null
}
