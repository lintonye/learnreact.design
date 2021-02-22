import {
  LiveProvider,
  LiveEditor as ReactLiveEditor,
  LiveError,
  LivePreview,
  LiveContext,
} from 'react-live'
import SimpleEditor from 'react-simple-code-editor'
import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  RefObject,
  MutableRefObject,
} from 'react'
import Highlight, {
  defaultProps,
  Prism,
  PrismTheme,
} from 'prism-react-renderer'
import vsDarkThemeDefault from 'prism-react-renderer/themes/vsDark'

const vscodeDarkTheme = {
  plain: {
    ...vsDarkThemeDefault.plain,
    color: '#cecece',
    backgroundColor: '#1e1e1e',
  },
  styles: [
    ...vsDarkThemeDefault.styles,
    // {
    //   types: ['prolog', 'comment', 'doctype', 'cdata'],
    //   style: {
    //     color: '#4a9a51',
    //   },
    // },
    {
      types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'],
      style: { color: '#0f90c3' },
    },
    {
      types: ['token', 'function'],
      style: {
        color: '#cecece',
      },
    },
    // {
    //   types: ['attr-name', 'string', 'char', 'builtin', 'insterted'],
    //   style: {
    //     color: '#69c3df',
    //   },
    // },
    // {
    //   types: ['entity', 'url', 'variable', 'language-css'],
    //   style: {
    //     color: '#1e749b',
    //     backgroundColor: 'transparent',
    //   },
    // },
    // {
    //   types: ['deleted'],
    //   style: {
    //     color: 'rgb(255, 85, 85)',
    //   },
    // },
    // {
    //   types: ['italic'],
    //   style: {
    //     fontStyle: 'italic',
    //   },
    // },
    // {
    //   types: ['important', 'bold'],
    //   style: {
    //     fontWeight: 'bold',
    //   },
    // },
    // {
    //   types: ['regex', 'important'],
    //   style: {
    //     color: '#e90',
    //   },
    // },
    {
      types: ['atrule', 'keyword'],
      style: {
        color: '#0f90c3',
      },
    },
    // {
    //   types: ['attr-equals'],
    //   style: {
    //     color: '#cecece',
    //   },
    // },
    // {
    //   types: ['string'],
    //   style: {
    //     color: '#dc8974',
    //   },
    // },
    {
      types: ['operator'],
      style: {
        color: '#cecece',
        backgroundColor: 'transparent',
      },
    },
    // {
    //   types: ['language-javascript', 'punctuation'],
    //   style: {
    //     color: '#cecece',
    //     backgroundColor: 'transparent',
    //   },
    // },

    {
      types: ['punctuation', 'symbol'],
      style: {
        opacity: '0.7',
      },
    },
  ],
}

function Tab({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col ` + className}>
      <div className="text-sm border-b-2 border-blue-700 border-opacity-50">
        <span className="px-2 py-1 rounded-t-md bg-blue-700 text-white">
          {title}
        </span>
      </div>
      <div className="flex-1 border-l-2 border-r-2 border-b-2  border-opacity-50 border-blue-700">
        {children}
      </div>
    </div>
  )
}

type ConsoleAPI = {
  log: (msg: any) => void
}

function Console({
  callbackRef,
}: {
  callbackRef: MutableRefObject<ConsoleAPI | null>
}) {
  const [std, setStd] = useState<React.ReactNode[]>([])
  useEffect(() => {
    callbackRef.current = {
      log: (msg: any) =>
        setStd((s) => [<div key={s.length}>{msg}</div>, ...s.slice(0, 10)]),
    }
  }, [callbackRef])
  return (
    <div className="overflow-scroll max-h-full flex flex-col-reverse p-2">
      {std}
    </div>
  )
}

type Props = {
  scope: { [key: string]: any }
  showPreview?: boolean
  showConsole?: boolean
  readOnly?: boolean
  render?: string
  children: string
}

function Editor({
  code: initialCode,
  language,
  theme,
  editable = false,
  ...rest
}: {
  code: string
  language: string
  theme: PrismTheme
  editable?: boolean
}) {
  const highlightCode = (code: string) => (
    <Highlight Prism={Prism} code={code} language="jsx" theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </>
      )}
    </Highlight>
  )
  const baseTheme = theme && typeof theme.plain === 'object' ? theme.plain : {}

  const [code, setCode] = useState(initialCode)

  return (
    <SimpleEditor
      value={code}
      padding={10}
      highlight={highlightCode}
      onValueChange={(c) => setCode(c)}
      disabled={!editable}
      // @ts-ignore
      style={{
        whiteSpace: 'pre',
        fontFamily: 'monospace',
        ...baseTheme,
        // ...style,
      }}
      {...rest}
    />
  )
}

function EditorInContext(props: any) {
  return (
    <LiveContext.Consumer>
      {({ code, language, theme, disabled }) => (
        <Editor
          theme={theme}
          code={code}
          language={language}
          editable={!disabled}
          // onChange={onChange}
          {...props}
        />
      )}
    </LiveContext.Consumer>
  )
}

export function CodeViewer({ children }: { children: string }) {
  const code = children.trim()
  return (
    <Tab title="JSX" className="text-xl">
      <Editor
        code={code}
        // @ts-ignore
        theme={vscodeDarkTheme}
        language="jsx"
        editable={false}
      />
    </Tab>
  )
}

export function LiveEditor({
  children,
  scope: customScope,
  showPreview = true,
  showConsole = true,
  readOnly = false,
  render,
}: Props) {
  const consoleCallbackRef = useRef<ConsoleAPI | null>(null)
  const scope = useMemo(
    () => ({
      ...customScope,
      console: {
        log: (msg: any) => {
          // We have to move the "std" state into Console component and call it via a ref.
          // This is because if we keep the state in LiveEditor and set state here, all the components in this tree will rerender (esp. ReactLiveEditor), causing the code to be reevaluated. The end result is that in the counter example, the console output is always 1.
          // Another potential solution is to use React.memo to memoize some components to prevent rerendering.
          typeof consoleCallbackRef.current?.log === 'function' &&
            consoleCallbackRef.current.log(msg)
        },
      },
    }),
    [],
  )
  const code = children.trim()

  return (
    <LiveProvider
      code={code}
      scope={scope}
      noInline={typeof render === 'string' ? true : false}
      transformCode={(c) => {
        if (typeof render === 'string') {
          return `${c}\n render(${render})`
        } else return c
      }}
      // @ts-ignore
      theme={vscodeDarkTheme}
    >
      <div className="grid grid-cols-1 gap-y-2 gap-x-2 md:grid-cols-12 md:grid-rows-2">
        <Tab
          title={'JSX' + (!readOnly ? ' (Editable)' : '')}
          className={`text-xl md:row-span-2 md:col-start-1 md:row-start-1 ${
            showPreview || showConsole ? 'md:col-end-9' : 'md:col-end-13'
          }  `}
        >
          <EditorInContext />
        </Tab>
        <LiveError className="col-start-1 md:col-span-12 bg-red-500 text-white p-4 rounded-sm" />
        {showPreview && (
          <Tab title="Preview" className="md:row-start-1 md:col-span-4">
            <LivePreview className="p-2" />
          </Tab>
        )}
        {showConsole && (
          <Tab
            title="Console"
            className="md:row-start-2  md:col-span-4"
            css={{ minHeight: 150 }}
          >
            <Console callbackRef={consoleCallbackRef} />
          </Tab>
        )}
      </div>
    </LiveProvider>
  )
}
