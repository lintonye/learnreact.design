import { jsx } from '@emotion/core'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { Main } from '../components/Main'
import { NavBar } from '../components/NavBar'
import { NextSeo } from 'next-seo'
import * as SEOData from '../../next-seo.json'

export default function Home() {
  return (
    <div>
      <NextSeo canonical={SEOData.siteUrl} />
      <NavBar />
      <main>
        <div className="max-w-screen-sm mx-auto min-h-screen">
          <Hero />
          <Main />
        </div>
      </main>
      <Footer />
    </div>
  )
}
