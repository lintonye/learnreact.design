import { Layout } from '@/components/Layout'
import React from 'react'
import { NextSeo } from 'next-seo'
import { AllTestimonials } from '@/components/testimonials/AllTestimonials'

export default function TestimonialsPage() {
  const title = 'Student Testimonials'
  return (
    <Layout>
      <NextSeo
        title={title}
        openGraph={{
          title,
          // description,
          // images: ogImage ? [ogImage] : undefined,
        }}
      />
      <main className="max-w-screen-lg mx-auto">
        <h1 className="m-20 text-center text-4xl font-bold">{title}</h1>
        <AllTestimonials />
      </main>
    </Layout>
  )
}
