import { Layout } from '@/components/Layout'
import React from 'react'
import Cover from './book-cover.jpg'
import Image from 'next/image'

export default function BookHome() {
  return (
    <Layout>
      <h1>坐标 React 星</h1>
      <p>Intros</p>
      <Image src={Cover} width={591} height={797} />
      <ul>
        <li>
          <a href="https://codesandbox.io/s/react-mental-models-book-chapter1-pl524">
            第 1 章
          </a>
        </li>
        <li>
          <a href="https://codesandbox.io/s/react-book-chapter-2-order-system-8eutc">
            第 2 章
          </a>
        </li>
        <li>
          <a href="https://codesandbox.io/s/react-mental-modesl-book-chapter3-ebnry">
            第 3 章
          </a>
        </li>
        <li>
          <a href="https://github.com/lintonye/github-jobs3">第 4 章</a>
          <p>
            其中的分支包含了该项目的构建步骤。最终结果位于{' '}
            <a href="https://github.com/lintonye/github-jobs3/tree/use-react-query">
              use-react-query
            </a>
          </p>
        </li>
      </ul>
    </Layout>
  )
}
