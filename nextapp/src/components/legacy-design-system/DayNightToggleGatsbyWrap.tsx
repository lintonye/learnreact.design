import * as React from 'react'

const Stub = () => <div>DayNightToggleStub</div>

// export default Stub;
export default function DayNightToggleGatsby(props) {
  const Comp =
    typeof window !== 'undefined'
      ? require('./DayNightToggle').DayNightToggle
      : Stub
  return <Comp {...props} />
}
