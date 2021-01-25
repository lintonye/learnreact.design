import * as React from 'react'

const Stub = () => <div>BoardButtonStub</div>

// export default Stub;
export default function BoardButtonGatsby(props: any) {
  const Comp =
    typeof window !== 'undefined' ? require('./BoardButton').BoardButton : Stub
  return <Comp {...props} />
}
