import * as React from 'react'
// import './styles.css'

export default function InputAndButtons() {
  const [draft, setDraft] = React.useState('') // define data/state
  return (
    <div className="App">
      <div>
        <input
          placeholder="Write a reply..."
          type="text"
          value={draft}
          // onChange={e => {
          //   setDraft(e.target.value);
          // }}
        />
      </div>
      <div className="suggestions">
        <button
          onClick={() => {
            // set input text to Hi
            setDraft('😍')
          }}
        >
          😍
        </button>
        <button
          onClick={() => {
            // set input text to Hey
            setDraft('😡')
          }}
        >
          😡
        </button>
        <button
          onClick={() => {
            setDraft('😭')
          }}
        >
          😭
        </button>
      </div>
    </div>
  )
}
