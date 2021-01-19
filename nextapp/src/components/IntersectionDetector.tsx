import { jsx } from '@emotion/react'
import { useEffect, useRef, useState, useContext } from 'react'
import { InPostStateContext } from '@/components/InPostStateContext'

type Props = {
  children: any
  onIntersectionChange: (params: {
    isIntersecting: boolean
    dispatch: any
  }) => void
}

export function IntersectionDetector({
  children,
  onIntersectionChange,
}: Props) {
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
          // console.log(entry)

          // if (on !== undefined && entry.isIntersecting)
          //   dispatch({ type: 'highlights', data: on })
          // if (off !== undefined && !entry.isIntersecting)
          //   dispatch({ type: 'highlights', data: on })
          typeof onIntersectionChange === 'function' &&
            onIntersectionChange({
              isIntersecting: entry.isIntersecting,
              dispatch,
            })
        },
        { threshold: 1 },
      )
      observer.observe(ref.current)
      return () => observer.disconnect()
    }
  }, [dispatch])
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
