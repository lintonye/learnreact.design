import React, {
  ReactSVGElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { getArrow } from 'perfect-arrows'

type Point = { x: number; y: number }

type ArrowProps = {
  a: Point
  b: Point
} & React.SVGProps<SVGSVGElement>

function Arrow({ a, b, ...props }: ArrowProps) {
  const [sx, sy, cx, cy, ex, ey, as, ac, ae] = getArrow(a.x, a.y, b.x, b.y, {
    padStart: 10,
    padEnd: 20,
    // flip: true,
    bow: 0,
  })

  const endAngleAsDegrees = ae * (180 / Math.PI)

  const [ref, box] = useRelativeBox()

  return (
    <svg
      viewBox={`0 0 ${box?.width || 100} ${box?.height || 100}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      {/* <path
        d="M8.233 19.76l.872-13.387 10.188 8.73-11.06 4.658z"
        fill="#000"
        stroke="#000"
        strokeWidth={3}
      /> */}
      <polygon
        points="0,-3 6,0, 0,3"
        // TODO: why need this +20?
        transform={`translate(${ex},${ey}) rotate(${endAngleAsDegrees + 20})`}
        fill="currentColor"
      />
      <path
        // d="M104 63c-43.697 2.911-73.776-12.278-90.237-45.568"
        d={`M${sx},${sy} Q${cx},${cy} ${ex},${ey}`}
        // fill="none"
        stroke="currentColor"
        strokeDasharray="4"
        strokeWidth={1}
      />
    </svg>
  )
}

function useRelativeBox(): [RefObject<any>, DOMRect | null] {
  const ref = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState<DOMRect | null>(null)
  useEffect(() => {
    function updateBox() {
      const element = ref.current
      if (element) {
        const viewportBox = element.getBoundingClientRect()
        const parentBox = element.parentElement?.getBoundingClientRect()
        setBox(
          DOMRectReadOnly.fromRect({
            x: viewportBox.x - (parentBox?.x || 0),
            y: viewportBox.y - (parentBox?.y || 0),
            width: viewportBox.width,
            height: viewportBox.height,
          }),
        )
      }
    }
    updateBox()
    const listener = () => updateBox()
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [])
  return [ref, box]
}

export function Demo({
  title,
  className,
  children,
}: {
  title: string
  className: string
  children: React.ReactNode
}) {
  const [arrowStartRef, startBox] = useRelativeBox()
  const [arrowEndRef, endBox] = useRelativeBox()
  return (
    <div
      className={`relative w-full flex flex-col justify-center items-center`}
    >
      {startBox && endBox && (
        <Arrow
          className="absolute inset-0 text-blue-600 pointer-events-none"
          a={{ x: startBox.x, y: startBox.y + startBox.height / 2 }}
          b={{ x: endBox.x + endBox.width / 2, y: endBox.bottom }}
        />
      )}
      <div ref={arrowEndRef}>{children}</div>
      <div
        ref={arrowStartRef}
        className="mt-10 relative left-20 text-blue-600 text-sm"
      >
        {title}
      </div>
    </div>
  )
}
