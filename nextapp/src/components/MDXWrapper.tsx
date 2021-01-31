import React from 'react'
import { FunctionComponent } from 'react'
import { MDXProvider } from '@mdx-js/react'
import Image from 'next/image'
import { FiLink } from 'react-icons/fi'
import { IntersectionDetector } from './IntersectionDetector'

const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold" {...props} />,
  h2: withAnchor(
    withTocNotifier((props: any) => (
      <h2 {...props} className={'text-3xl font-bold my-3 ' + props.className} />
    )),
  ),
  h3: withAnchor(
    withTocNotifier((props: any) => (
      <h3 {...props} className={'text-2xl font-bold my-2 ' + props.className} />
    )),
  ),
  h4: withAnchor((props: any) => (
    <h4 {...props} className={'text-xl font-bold ' + props.className} />
  )),
  ul: (props: any) => <ul className="list-outside list-disc ml-5" {...props} />,
  ol: (props: any) => (
    <ol className="list-outside list-decimal ml-5" {...props} />
  ),
  li: (props: any) => <li className=" leading-loose" {...props} />,
  a: (props: any) => <a className="underline" {...props} />,
  p: (props: any) => <p className="leading-loose" {...props} />,
  hr: (props: any) => <hr className="my-6" {...props} />,
  table: (props: any) => (
    <table className="border-collapse border border-gray-300" {...props} />
  ),
  td: (props: any) => <td className="border border-gray-300 p-2" {...props} />,
  th: (props: any) => <th className="border border-gray-300 p-2" {...props} />,
  thead: (props: any) => <thead className="bg-gray-100" {...props} />,
  img: (props: any) => (
    <Image
      // className="mx-auto max-w-full"
      width={1024}
      height={768}
      layout="responsive"
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="px-3 py-2 italic border-l-4 border-gray-300 bg-gray-100"
      {...props}
    />
  ),
}
function withAnchor(Comp: FunctionComponent) {
  return function HeadingWithAnchor({ id, ...props }: any) {
    return (
      <div className="relative">
        <a
          id={id}
          href={`#${id}`}
          className="hover:underline"
          css={{
            '&:hover .icon': {
              opacity: 1,
            },
          }}
        >
          <FiLink className="absolute top-2 -left-7 opacity-0 icon" size={20} />
          <Comp {...props} />
        </a>
      </div>
    )
  }
}
function withTocNotifier(Comp: FunctionComponent) {
  return function HeadingWithTocNotifier(props: any) {
    return (
      <div>
        <Comp {...props} />
        <IntersectionDetector
          onIntersectionChange={({ isIntersecting, dispatch }) => {
            // isIntersecting && console.log('heading', props.children)
            isIntersecting &&
              dispatch({ type: 'activeHeadingSlug', data: props.id })
          }}
        >
          <div className="absolute h-16 w-1" />
        </IntersectionDetector>
      </div>
    )
  }
}
export function MDXWrapper({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
