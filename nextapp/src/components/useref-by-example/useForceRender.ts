import React from 'react'
export function useForceRender() {
  const setC = React.useState(0)[1]
  return () => setC((c) => c + 1)
}
