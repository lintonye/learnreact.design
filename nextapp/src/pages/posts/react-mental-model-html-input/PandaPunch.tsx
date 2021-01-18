import React, { useState } from 'react'
import { Button } from '@/components/design-system'
// import './panda-punch.css'

export default function PandaPunch() {
  const [punch, setPunch] = useState(40)
  return (
    <div className="text-lg flex flex-col justify-center items-center space-y-5">
      <span className="text-6xl" role="img" aria-label="panda">
        💪🐼
        <span style={{ fontSize: punch }} role="img" aria-label="fist">
          👊
        </span>
      </span>
      <div className="flex space-x-4 items-center">
        <label>Punch:</label>
        <input
          type="range"
          value={punch}
          min={40}
          max={200}
          onChange={function (event) {
            setPunch(event.target.valueAsNumber)
          }}
        />
        <Button
          size="small"
          onClick={function () {
            alert('Punch power:' + punch)
          }}
        >
          Show
        </Button>
      </div>
    </div>
  )
}
