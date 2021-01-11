import { jsx } from '@emotion/core'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import { useState, useContext } from 'react'
import { InPostMessageContext } from '@/components/InPostMessageContext'

type Props = {
  code: string
  onChange?: (code: string, dispatch: any) => void
}

export function CodeEditor({ code: initialCode, onChange }: Props) {
  const [code, setCode] = useState(initialCode)
  const [_, dispatch] = useContext(InPostMessageContext)
  return (
    <Editor
      value={code}
      onValueChange={(c) => {
        setCode(c)
        typeof onChange === 'function' && onChange(c, dispatch)
      }}
      highlight={(code) => highlight(code, languages.xml, 'xml')}
      padding={10}
      // style={{
      //   fontFamily: '"Fira code", "Fira Mono", monospace',
      //   fontSize: 12,
      // }}
    />
  )
}
