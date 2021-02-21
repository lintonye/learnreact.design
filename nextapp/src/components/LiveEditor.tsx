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
      <div>{title}</div>
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
    <LiveProvider code={children} scope={scope} noInline={false}>
      <div className="grid grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
        <Tab
          title="Code"
          className="md:row-span-2 md:col-start-1 md:row-start-1"
        >
          <ReactLiveEditor />
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
