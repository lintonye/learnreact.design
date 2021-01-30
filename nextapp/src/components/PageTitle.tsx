import React from 'react'
export function PageTitle({
  children,
  subtitle,
}: {
  children: React.ReactNode
  subtitle: string
}) {
  return (
    <div className="m-20 space-y-4 max-w-screen-md mx-auto">
      <h1 className="text-center text-4xl font-bold">{children}</h1>
      <div className="text-xl text-center">{subtitle}</div>
    </div>
  )
}
