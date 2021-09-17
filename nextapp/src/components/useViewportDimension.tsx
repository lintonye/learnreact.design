import { useEffect, useState } from 'react'

export function useViewportDimension() {
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
