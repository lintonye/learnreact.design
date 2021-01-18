import * as React from 'react'
import { Button } from '@/components/design-system/Button'

export function KungfuPanda() {
  const [who, setWho] = React.useState('🐼')
  return (
    <div className="flex flex-col justify-center items-center">
      <div style={{ fontSize: 100 }}>💪{who}👊</div>
      <div className=" space-x-4">
        <Button
          onClick={function () {
            setWho('🐼')
          }}
        >
          Panda
        </Button>
        <Button
          onClick={function () {
            setWho('🐯')
          }}
        >
          Tiger
        </Button>
        <Button
          onClick={function () {
            setWho('🐵')
          }}
        >
          Monkey
        </Button>
        <Button
          onClick={function () {
            setWho('🐷')
          }}
        >
          Pig
        </Button>
      </div>
    </div>
  )
}
