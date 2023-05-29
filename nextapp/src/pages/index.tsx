import { Hero } from '../components/Hero'
import { Layout } from '../components/Layout'
import { Main } from '../components/Main'
import { NextSeo } from 'next-seo'
import * as SEOData from '../../next-seo.json'
import { ChattieChatBubbleEmbed } from './Chattie'

export default function Home() {
  return (
    <Layout>
      <NextSeo canonical={SEOData.siteUrl} />
      <ChattieChatBubbleEmbed id="chattie-embed-1234" />
      <main>
        <div className="w-11/12 max-w-screen-lg mx-auto min-h-screen">
          <Hero />
          <Main />
        </div>
      </main>
    </Layout>
  )
}
