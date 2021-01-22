import * as React from 'react'
import { Input, Button } from '@/components/design-system'
// import './styles.css'

export default function InputAndButtons() {
  const [draft, setDraft] = React.useState('') // define data/state
  return (
    <div className="space-y-3">
      <div>
        <Input
          placeholder="Write a reply..."
          type="text"
          value={draft}
          onChange={(e) => {
            // setDraft(e.target.value);
          }}
        />
      </div>
      <div className="space-x-1">
        <Button
          onClick={() => {
            // set input text to Hi
            setDraft('😍')
          }}
        >
          😍
        </Button>
        <Button
          onClick={() => {
            // set input text to Hey
            setDraft('😡')
          }}
        >
          😡
        </Button>
        <Button
          onClick={() => {
            setDraft('😭')
          }}
        >
          😭
        </Button>
      </div>
    </div>
  )
}
