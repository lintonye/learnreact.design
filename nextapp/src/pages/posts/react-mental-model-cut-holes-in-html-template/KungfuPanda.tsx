import * as React from 'react'

export default function KungfuPanda() {
  const [who, setWho] = React.useState('🐼')
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
      <div style={{ fontSize: 100 }}>💪{who}👊</div>
      <div style={{}}>
        <button
          style={buttonStyle}
          onClick={function () {
            setWho('🐼')
          }}
        >
          Panda
        </button>
        <button
          style={buttonStyle}
          onClick={function () {
            setWho('🐯')
          }}
        >
          Tiger
        </button>
        <button
          style={buttonStyle}
          onClick={function () {
            setWho('🐵')
          }}
        >
          Monkey
        </button>
        <button
          style={buttonStyle}
          onClick={function () {
            setWho('🐷')
          }}
        >
          Pig
        </button>
      </div>
    </div>
  )
}
