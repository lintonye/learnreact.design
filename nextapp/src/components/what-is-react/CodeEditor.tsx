import { jsx } from '@emotion/core'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import { useState, useContext } from 'react'
import { InPostMessageContext } from '@/components/InPostMessageContext'
import { parseJsx } from '@/lib/parseJsx'

type Props = {
  code: string
  onChange?: (code: string, dispatch: any) => void
}

export function CodeEditor({ code: initialCode, onChange }: Props) {
  const [code, setCode] = useState(initialCode)
  const [error, setError] = useState(null)
  const [_, dispatch] = useContext(InPostMessageContext)
  return (
    <div>
      <Editor
        value={code}
        onValueChange={(c) => {
          setCode(c)
          try {
            const jsxJson = parseJsx(c)
            typeof onChange === 'function' && onChange(jsxJson, dispatch)
          } catch (e) {
            setError(e)
          }
        }}
        highlight={(code) => highlight(code, languages.xml, 'xml')}
        padding={10}
        // style={{
        //   fontFamily: '"Fira code", "Fira Mono", monospace',
        //   fontSize: 12,
        // }}
      />
      {error && <div className="bg-red-500 text-white p-2">{error}</div>}
    </div>
  )
}
