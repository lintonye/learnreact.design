import * as React from 'react'
// import './panda.css'

export default function KungfuPandaPupils() {
  const [action, setAction] = React.useState('👊')
  const buttonStyle = { fontSize: 18 }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span className="panda" role="img" aria-label="panda">
        💪🐼{action}
      </span>
      <div className="pupils">
        <span className="pupil" role="img" aria-label="tiger">
          💪🐯{action}
        </span>
        <span className="pupil" role="img" aria-label="money">
          💪🐵{action}
        </span>
        <span className="pupil" role="img" aria-label="pig">
          💪🐷{action}
        </span>
      </div>
      <div className="buttons">
        <button
          onClick={function () {
            setAction('👊')
          }}
        >
          Punch
        </button>
        <button
          onClick={function () {
            setAction('🦶')
          }}
        >
          Kick
        </button>
        <button
          onClick={function () {
            setAction('👉')
          }}
        >
          Poke
        </button>
        <button
          onClick={function () {
            setAction('🤜')
          }}
        >
          Side punch
        </button>
      </div>
    </div>
  )
}
