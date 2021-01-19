import { jsx } from '@emotion/react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-jsx'
import { useState, useContext } from 'react'
import { InPostStateContext } from '@/components/InPostStateContext'
import { parseJsx } from '@/lib/parseJsx'
import { JsxNode } from '@/types'

type Props = {
  code: string
  onChange?: (code: JsxNode, dispatch: any) => void
}

export function CodeEditor({ code: initialCode, onChange, ...props }: Props) {
  const [code, setCode] = useState(initialCode)
  const [error, setError] = useState<string | null>(null)
  const [_, dispatch] = useContext(InPostStateContext)
  return (
    <div>
      <div className="font-mono">
        <Editor
          value={code}
          onValueChange={(c) => {
            setCode(c)
            try {
              // console.log(c)
              const jsxJson = parseJsx(c)
              setError(null)
              typeof onChange === 'function' && onChange(jsxJson, dispatch)
            } catch (e) {
              setError(typeof e === 'string' ? e : JSON.stringify(e))
              if (typeof e !== 'string') console.error(e)
            }
          }}
          highlight={(code) => highlight(code, languages.xml, 'jsx')}
          padding={10}
          {...props}
          // style={{
          //   fontFamily: '"Fira code", "Fira Mono", monospace',
          //   fontSize: 12,
          // }}
        />
      </div>
      {error && <div className="bg-red-500 text-white p-2">{error}</div>}
    </div>
  )
}
