import { jsx } from '@emotion/core'
import Head from 'next/head'

export default function PostList() {
  return (
    <div>
      <Head>
        <title>React For Designers and Visual Learners</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Hand-picked resources on the intersection of design and frontend
          development: React, Framer, HTML, CSS, JavaScript"
        />
      </Head>

      <main>
        <div className="max-w-screen-md mx-auto"></div>
      </main>
    </div>
  )
}
