import * as React from 'react'

const Stub = () => <div>SimpleToggleStub</div>

// export default Stub;

export default function SimpleToggleGatsby(props) {
  const Comp =
    typeof window !== 'undefined'
      ? require('./SimpleToggle').SimpleToggle
      : Stub
  return <Comp {...props} />
}
