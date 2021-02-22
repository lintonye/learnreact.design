import {
  LiveProvider,
  LiveEditor as ReactLiveEditor,
  LiveError,
  LivePreview,
} from 'react-live'
import {
  useState,
  useMemo,
  useRef,
  useEffect,
  RefObject,
  MutableRefObject,
} from 'react'

const editorTheme = {
  plain: {
    color: '#cecece',
  },
  styles: [
    {
      types: ['prolog', 'comment', 'doctype', 'cdata'],
      style: {
        color: '#4a9a51',
      },
    },
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
    {
      types: ['attr-name', 'string', 'char', 'builtin', 'insterted'],
      style: {
        color: '#69c3df',
      },
    },
    {
      types: ['entity', 'url', 'variable', 'language-css'],
      style: {
        color: '#1e749b',
        backgroundColor: 'transparent',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(255, 85, 85)',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['regex', 'important'],
      style: {
        color: '#e90',
      },
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: {
        color: '#0f90c3',
      },
    },
    {
      types: ['attr-equals'],
      style: {
        color: '#cecece',
      },
    },
    {
      types: ['string'],
      style: {
        color: '#dc8974',
      },
    },
    {
      types: ['operator'],
      style: {
        color: '#cecece',
        backgroundColor: 'transparent',
      },
    },
    {
      types: ['language-javascript', 'punctuation'],
      style: {
        color: '#cecece',
        backgroundColor: 'transparent',
      },
    },

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
    <div className={` ` + className}>
      <div className="text-sm">{title}</div>
      {children}
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
    <div className="overflow-scroll h-full flex flex-col-reverse">{std}</div>
  )
}

type Props = {
  children: string
}

export function LiveEditor({ children }: Props) {
  const consoleCallbackRef = useRef<ConsoleAPI | null>(null)
  const scope = useMemo(
    () => ({
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

  return (
    <LiveProvider
      code={children}
      scope={scope}
      noInline={false}
      // @ts-ignore
      theme={editorTheme}
    >
      <div className="grid grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
        <Tab
          title="Code"
          className="md:row-span-2 md:col-start-1 md:row-start-1"
        >
          <ReactLiveEditor
            className="text-xl"
            css={{ backgroundColor: '#1e1e1e' }}
          />
        </Tab>
        <LiveError className="col-start-1 md:col-span-2 bg-red-500 text-white p-4 rounded-sm" />
        <Tab title="Preview" className="md:row-start-1">
          <LivePreview />
        </Tab>
        <Tab title="Console" className="h-40 md:row-start-2">
          <Console callbackRef={consoleCallbackRef} />
        </Tab>
      </div>
    </LiveProvider>
  )
}
