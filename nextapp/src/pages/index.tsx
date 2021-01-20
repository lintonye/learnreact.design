import { jsx } from '@emotion/core'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { Layout } from '../components/Layout'
import { Main } from '../components/Main'
import { NextSeo } from 'next-seo'
import * as SEOData from '../../next-seo.json'

export default function Home() {
  return (
    <Layout>
      <NextSeo canonical={SEOData.siteUrl} />
      <main>
        <div className="max-w-screen-sm mx-auto min-h-screen">
          <Hero />
          <Main />
        </div>
      </main>
    </Layout>
  )
}
