import { useRef, useEffect, useState } from 'react'

const format = (ms: number) => {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms - hours * 3600000) / 60000)
  const seconds = Math.floor((ms - hours * 3600000 - minutes * 60000) / 1000)
  const millis = ms - hours * 3600000 - minutes * 60000 - seconds * 1000
  const pad = (n: number, len: number) => {
    let result = n + ''
    let digits = 0
    while (n > 0) {
      n = Math.floor(n / 10)
      digits++
    }
    if (digits === 0) digits++
    const zeros = Math.max(0, len - digits)
    for (let i = 0; i < zeros; i++) result = '0' + result
    return result
  }
  return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(millis, 3)}`
}

export function StopWatch() {
  const [milliSeconds, setMilliSeconds] = useState(0)
  const [ticking, setTicking] = useState(false)
  const interval = useRef<number>()
  useEffect(() => {
    if (ticking) {
      interval.current = setInterval(() => setMilliSeconds((ms) => ms + 1), 1)
      return () => clearInterval(interval.current)
    } else if (interval.current) {
      clearInterval(interval.current)
    }
  }, [ticking])

  return (
    <div className="bg-blue-800 text-white border border-indigo-900 rounded-lg py-4 px-2 flex flex-col justify-center items-center space-y-4 w-30 shadow-md">
      <div className="self-stretch bg-blue-100 px-2 text-blue-900 rounded-sm font-mono">
        {format(milliSeconds)}
      </div>
      <button
        onClick={() => setTicking((c) => !c)}
        className="text-xs bg-gray-900 px-4 py-2 rounded-md font-bold uppercase outline-none hover:bg-gray-800"
      >
        {milliSeconds === 0 ? 'Start' : ticking ? 'Pause' : 'Resume'}
      </button>
    </div>
  )
}
