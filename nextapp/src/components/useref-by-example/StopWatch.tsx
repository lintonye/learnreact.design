import { useRef, useEffect, useState } from 'react'

const format = (ms: number) => {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms - hours * 3600000) / 60000)
  const seconds = Math.floor((ms - hours * 3600000 - minutes * 60000) / 1000)
  const tenMillis = Math.floor(
    (ms - hours * 3600000 - minutes * 60000 - seconds * 1000) / 10,
  )
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
  return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(tenMillis, 2)}`
}

export function StopWatch() {
  const [lastStart, setLastStart] = useState(0)
  const ticking = lastStart > 0

  const [milliSeconds, setMilliSeconds] = useState(0)
  const interval = useRef<number>()
  useEffect(() => {
    if (ticking) {
      let lastMillisecs = milliSeconds
      interval.current = setInterval(
        () => setMilliSeconds(lastMillisecs + new Date().getTime() - lastStart),
        10,
      )
      return () => clearInterval(interval.current)
    } else if (interval.current) {
      clearInterval(interval.current)
    }
    // milliSeconds can't be in the deps, we need to only get its latest value when ticking is updated. Otherwise the stopwatch would be updated too often
  }, [ticking, lastStart])

  return (
    <div className="bg-blue-800 text-white border border-indigo-900 rounded-lg py-4 px-2 flex flex-col justify-center items-center space-y-4 w-30 shadow-md">
      <div className="self-stretch bg-blue-100 px-2 text-blue-900 rounded-sm font-mono">
        {format(milliSeconds)}
      </div>
      <button
        onClick={() => {
          setLastStart((c) => (c === 0 ? new Date().getTime() : 0))
        }}
        className="text-xs bg-gray-900 px-4 py-2 rounded-md font-bold uppercase outline-none hover:bg-gray-800"
      >
        {milliSeconds === 0 ? 'Start' : ticking ? 'Pause' : 'Resume'}
      </button>
    </div>
  )
}
