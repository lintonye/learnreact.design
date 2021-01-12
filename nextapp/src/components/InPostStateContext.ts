import React from 'react'

export type InPostAction = {
  type: string
  data: any
}

export type InPostState = {
  [key: string]: any
}

type MessagePair = [InPostState, (action: InPostAction) => void]

export const InPostStateContext = React.createContext<MessagePair>([
  {},
  () => {},
])
