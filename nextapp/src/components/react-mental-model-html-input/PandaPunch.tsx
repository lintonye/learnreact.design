import React, { useEffect, useState } from 'react'
import { Button } from '@/components/design-system'
// import './panda-punch.css'

export default function PandaPunch({
  autoPlay = false,
}: {
  autoPlay: boolean
}) {
  const [punch, setPunch] = useState(40)
  useEffect(() => {
    if (autoPlay) {
      const range = [40, 80, 40, 80]
      let i = 0
      const timeout = setTimeout(() => {
        if (i < range.length - 1) {
          const p1 = range[i]
          const p2 = range[i + 1]
          const min = Math.min(p1, p2)
          const max = Math.max(p1, p2)
          if (min <= punch && punch <= max) {
            const direction = p1 <= punch && punch <= p2 ? 1 : -1
            setPunch(punch + direction * 5)
          } else {
            i++
          }
        }
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [autoPlay, punch])
  return (
    <div className="text-lg flex flex-col justify-center items-center space-y-5">
      <span className="text-6xl" role="img" aria-label="panda">
        💪🐼
        <span style={{ fontSize: punch }} role="img" aria-label="fist">
          👊
        </span>
      </span>
      {!autoPlay && (
        <div className="flex space-x-4 items-center">
          <label>Punch:</label>
          <input
            type="range"
            value={punch}
            min={40}
            max={200}
            onChange={function (event) {
              setPunch(event.target.valueAsNumber)
            }}
          />
          <Button
            size="small"
            onClick={function () {
              alert('Punch power:' + punch)
            }}
          >
            Show
          </Button>
        </div>
      )}
    </div>
  )
}
