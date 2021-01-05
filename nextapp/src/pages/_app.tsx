import React from 'react'
import { AppProps } from 'next/app'
import 'prismjs/themes/prism.css'
import '../styles/globals.css'
import { DefaultSeo } from 'next-seo'
import Router from 'next/router'

import SEO from '../../next-seo.json'
import { pageview } from '@/lib/gtag'

process.env.NODE_ENV === 'production' &&
  Router.events.on('routeChangeComplete', (url) => pageview(url))

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
