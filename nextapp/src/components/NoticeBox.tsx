type Props = {
  title: string
  children: React.ReactNode
}

export function NoticeBox({ title, children }: Props) {
  return (
    <div className="p-8 bg-yellow-100 border border-yellow-400 rounded-sm space-y-4 my-2">
      <p className="font-bold">{title}</p>
      {children}
    </div>
  )
}
