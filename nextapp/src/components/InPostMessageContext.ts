import React from 'react'

type Message = {
  type: string
  data: any
}
type MessagePair = [Message, (message: Message) => void] | []

export const InPostMessageContext = React.createContext<MessagePair>([])
