import * as React from 'react'

const ScrollContext = React.createContext<any>({ scrollTop: 0, xy: [0, 0] })
export default ScrollContext
