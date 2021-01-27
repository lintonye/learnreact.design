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
        <div className="max-w-screen-lg mx-auto min-h-screen">
          <Hero />
          <Main />
        </div>
      </main>
    </Layout>
  )
}
