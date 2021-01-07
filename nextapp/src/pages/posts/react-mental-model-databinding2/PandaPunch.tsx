import React, { useState } from 'react'
import './panda-punch.css'

export default function PandaPunch() {
  const [punch, setPunch] = useState(40)
  return (
    <div className="App">
      <span className="panda" role="img" aria-label="panda">
        💪🐼
        <span style={{ fontSize: punch }} role="img" aria-label="fist">
          👊
        </span>
      </span>
      <div className="control-container">
        Punch:
        <input
          type="range"
          value={punch}
          min={40}
          max={200}
          onChange={function (event) {
            setPunch(event.target.valueAsNumber)
          }}
        />
        <button
          onClick={function () {
            alert('Punch power:' + punch)
          }}
        >
          Show
        </button>
      </div>
    </div>
  )
}
