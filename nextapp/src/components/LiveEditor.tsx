import {
  LiveProvider,
  LiveEditor as ReactLiveEditor,
  LiveError,
  LivePreview,
} from 'react-live'
import { useState, useMemo } from 'react'

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

function Console({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-scroll h-full flex flex-col-reverse">
      {children}
    </div>
  )
}

type Props = {
  children: string
}

export function LiveEditor({ children }: Props) {
  const [std, setStd] = useState<React.ReactNode[]>([])

  const scope = useMemo(
    () => ({
      console: {
        log: (msg: any) => {
          console.log(msg)
          setStd((s) => [...s, <div key={s.length}>{msg}</div>])
        },
      },
    }),
    [],
  )

  return (
    <LiveProvider code={children} scope={scope} noInline={false}>
      <div className="grid grid-cols-1 gap-x-2 md:grid-cols-2">
        <Tab title="Code" className="md:row-span-2">
          <ReactLiveEditor />
        </Tab>
        <LiveError />
        <Tab title="Preview">
          <LivePreview />
        </Tab>
        <Tab title="Console" className="h-40">
          <Console>{std}</Console>
        </Tab>
      </div>
    </LiveProvider>
  )
}
