import * as React from 'react'

const ScrollContext = React.createContext<{
  scrollTop: number
  xy: [number, number]
}>({ scrollTop: 0, xy: [0, 0] })
export default ScrollContext
