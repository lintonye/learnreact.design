import { jsx } from '@emotion/core'
import { useEffect, useRef, useState, useContext } from 'react'
import { InPostStateContext } from '@/components/InPostStateContext'

type Props = {
  children: any
  on?: string
  off?: string
}

export function OffScreenDetector({ children, on, off }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [targetHeight, setTargetHeight] = useState(0)
  const [_, dispatch] = useContext(InPostStateContext)
  // useEffect(() => {
  //   const target = document.getElementById(topMarginItemId)
  //   if (target) {
  //     setTargetHeight(target.getBoundingClientRect().height)
  //   }
  // }, [topMarginItemId])
  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          // if (entry.intersectionRatio < 1)
          //   target?.classList.add('sticky', 'top-0')
          // else target?.classList.remove('sticky', 'top-0')
          // entry.isIntersecting && entry.
          // console.log(
          //   entry.intersectionRect,
          //   entry.isIntersecting,
          //   entry.intersectionRatio,
          // )
          if (on !== undefined && entry.isIntersecting)
            dispatch({ type: 'highlight', data: on })
          if (off !== undefined && !entry.isIntersecting)
            dispatch({ type: 'highlight', data: on })
        },
        { threshold: 1 },
      )
      observer.observe(ref.current)
      return () => observer.disconnect()
    }
  }, [on, off])
  return (
    // <div className="relative">
    //   <div
    //     ref={ref}
    //     className="absolute w-2 opacity-50 bg-green-300"
    //     css={{ height: targetHeight, top: -targetHeight }}
    //   />
    // </div>
    <div ref={ref}>{children}</div>
  )
}
