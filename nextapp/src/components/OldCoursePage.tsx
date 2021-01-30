import { css, jsx } from '@emotion/core'
import React from 'react'
import { Layout } from '@/components/Layout'
import { PageTitle } from '@/components/PageTitle'
import { NextSeo } from 'next-seo'
import { Button, ConvertKitForm, Link } from '@/components/design-system'
import { Course } from '@/types'
import { CustomerQuote } from '@/components/testimonials/AllTestimonials'
import Companies from '@/components/Companies'

function SocialProof() {
  const quotes = [
    <CustomerQuote
      name="Ryder Booth"
      title="UX Lead"
      company="Cisco"
      pictureName="ryder"
      showMore
    >
      Linton’s tutorials are constructed very thoughtfully and string concepts
      together in a clear and useful way. Well worth the money and time
      investment.
    </CustomerQuote>,
    <CustomerQuote
      name="Joshua Ulm"
      title="Group Vice President of Design"
      company="Oracle"
      pictureName="joshua"
      showMore
    >
      The closer a designer is to the actual customer experience the better. The
      learnreact.design videos are the perfect intro for designers looking to
      get a better understanding of React.
    </CustomerQuote>,
    <CustomerQuote
      name="Carley Cooper"
      title="Designer"
      company="Architech"
      pictureName="carley"
      showMore
    >
      Being a designer in the tech industry has opened my world to new tools and
      technologies. Linton's program is simple to follow, with the content
      divided in a thoughtful manner. With this training, I feel very well
      rounded in my technical abilities as a designer today.
    </CustomerQuote>,
  ]
  return (
    <>
      {quotes[Math.floor(Math.random() * quotes.length)]}
      <Companies />
    </>
  )
}
function Pricing({ course }: { course: Course }) {
  const { title, icon, length, price } = course
  return (
    <div className="flex flex-col justify-center items-center space-y-8">
      <div className="shadow-md bg-white border rounded-sm border-gray-300 p-8 flex flex-col items-center space-y-6">
        {icon}
        <div className="text-lg font-semibold">{title}</div>
        <div>{length}</div>
        <div className="relative">
          <div
            className="text-xl font-normal"
            css={css`
              &::after {
                content: '';
                border-bottom: 2px solid red;
                position: absolute;
                left: 0;
                top: 50%;
                width: 100%;
              }
            `}
          >
            ${price?.original}
          </div>
          <div className="absolute left-12 -top-2 font-semibold">
            ${price?.current}
          </div>
        </div>
        {price && (
          <Link href={price.purchaseUrl} className="self-stretch">
            <Button variant="primary" className="w-full">
              Enroll
            </Button>
          </Link>
        )}
      </div>
      <SocialProof />
    </div>
  )
}
export function OldCoursePage({
  course,
  convertkitFormId,
}: {
  course: Course
  convertkitFormId: string
}) {
  const { title, excerpt, chapters, youtubeId } = course

  return (
    <Layout>
      <NextSeo title={title} description={excerpt} />
      <main className="w-11/12 max-w-prose mx-auto flex flex-col space-y-16">
        <div>
          <PageTitle subtitle={excerpt}>{title}</PageTitle>
          <div className="aspect-16x9 rounded-sm overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?rel=0&controls=1&showinfo=0&autoplay=0`}
              frameBorder="0"
              title="welcome"
              allowFullScreen
              className=""
            />
          </div>
          <div className="m-10 flex justify-center">
            <ConvertKitForm
              formId={convertkitFormId}
              subscribeButtonTitle="Get Sample Lessons"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl uppercase font-bold text-center m-10">
            Enroll Now
          </h2>
          <Pricing course={course} />
        </div>
        <div>
          <h2 className="text-2xl uppercase font-bold text-center m-10">
            table of contents
          </h2>
          <ul className="space-y-8">
            {chapters?.map(({ chapter, lectures }) => (
              <li key={chapter} className="space-y-2">
                <h3 className="font-bold">{chapter}</h3>
                <ul className="space-y-2">
                  {lectures.map((lecture: any) => {
                    const { name, link } =
                      typeof lecture === 'string'
                        ? { name: lecture, link: null }
                        : lecture
                    return (
                      <li key={name}>
                        {link ? <Link href={link}>{name}</Link> : name}
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </Layout>
  )
}
