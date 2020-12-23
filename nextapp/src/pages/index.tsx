import { jsx } from '@emotion/core'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { Main } from '../components/Main'
import { NavBar } from '../components/NavBar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>React For Designers and Visual Learners</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Hand-picked resources on design and frontend development: React, Framer, HTML, CSS, JavaScript"
        />
      </Head>

      <NavBar />
      <main>
        <div className="max-w-screen-md mx-auto">
          <Hero />
          <Main />
        </div>
      </main>
      <Footer />
    </div>
  )
}
