import React from 'react'

type MessagePair = [string, (message: string) => void]

export const InPostMessageContext = React.createContext<MessagePair>([
  '',
  (message: string) => {},
])
