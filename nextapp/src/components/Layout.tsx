import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { NextSeo } from 'next-seo'
import * as SEOData from '@/../next-seo.json'
import { useRouter } from 'next/router'

type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  const router = useRouter()
  const url = SEOData.siteUrl + router.pathname
  return (
    <div
      className="min-h-screen flex flex-col"
      // css={{
      //   '& p': { lineHeight: 2 },
      // }}
    >
      <NextSeo
        canonical={url}
        openGraph={{
          url,
        }}
      />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
