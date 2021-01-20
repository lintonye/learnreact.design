import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
