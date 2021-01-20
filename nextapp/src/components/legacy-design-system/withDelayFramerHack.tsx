import * as React from 'react'
import { animated, useSpring } from 'react-spring'
import { Box } from '.'

// // This is a hack to work around the issue that the page
// // needs a refresh to properly display the toggle.
export function withDelayFramerHack(Comp: React.FunctionComponent) {
  return function WithDelayFramerHack(props: any) {
    const [realComp, setRealComp] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const anim = useSpring({ opacity: visible ? 1 : 0 })
    React.useEffect(() => {
      setTimeout(() => {
        setRealComp(true)
        setVisible(true)
      }, 500)
    }, [])
    return (
      <animated.div style={anim}>
        {realComp ? <Comp {...props} /> : <Box height={28} width={70} />}
      </animated.div>
    )
  }
}
