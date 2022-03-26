import { Layout } from '@/components/Layout'
import React from 'react'
import Cover from './book-cover.png'
import Ch1 from './chapter1.png'
import Ch2 from './chapter2.png'
import Ch3 from './chapter3.png'
import Ch4 from './chapter4.png'
import Star from './star.png'
import Image from 'next/image'
import { FiAlignCenter } from 'react-icons/fi'

export default function BookHome() {
  return (
    <Layout>
      <div className="p-8 -mb-6 bg-gradient-to-b from-black via-blue-100">
        <div className="flex flex-col items-center md:flex-row md:justify-center">
          <Image src={Star} width={108} height={100} objectFit={'contain'} />

          <div className="m-2 md:m-0 md:p-4">
            <h1 className="font-extrabold text-center text-4xl p-1 text-white md:text-6xl md:text-left md:p-2 ">
              坐标 React 星
            </h1>
            <h1 className="text-center text-xl p-1 text-white  md:text-3xl md:text-left md:p-2">
              React 开发核心思维模型
            </h1>
          </div>
        </div>

        <div className="m-auto max-w-screen-lg md:flex md:justify-center">
          <div className="flex justify-center items-start md:p-4">
            <Image
              src={Cover}
              width={591 * 0.55}
              height={797 * 0.55}
              objectFit={'contain'}
            />
          </div>
          <div className="md:w-4/5 m-2 md:ml-1">
            <p className="p-4 font-normal text-gray-800 leading-10 ">
              本书通过一个奇幻故事的外壳讲解 React
              开发必备的核心思维模型，即如何用 React
              的独特方式思考和解决问题。故事主角用“脑机”进入“Web
              宇宙”，登陆“React星”。通过体验各种离奇见闻，由浅入深地介绍 React
              开发的核心知识点，例如声明式和响应式编程、不可变约定、单向数据流、组件组合的运用、组件渲染特性、Hook
              的基本原理和常见模式、组件构架设计和
              State管理，等等。“让读者在娱乐中学习”，这是作者的初衷。为了帮助读者理解和记忆，本书为每一个思维模型都配备了生动有趣的故事桥段和漫画插图。本书强调揭示各个概念的本质，不光展示“如何做”，更注重解释“为什么”，并辅以实例操作，旨在打开一扇门——鼓励读者深挖基础知识，增强自行推演结论、进一步学习实战知识的能力。
              本书主要适合对
              HTML、CSS、JavaScript、DOM有一定了解的前端开发者、设计师和高校学生等阅读。
            </p>
            <div className="flex justify-center md:justify-start ">
              <a href="https://item.jd.com/13651890.html" target="_blank">
                <button className="rounded-full bg-gradient-to-b from-yellow-200 to-yellow-300 w-48 h-12 text-xl m-4 mt-0 tracking-widest ">
                  购买纸质书
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl mt-16 mb-0 text-center ">书中代码</h1>

      <div className="flex flex-wrap flex-col gap-y-4 md:flex-row md:justify-center md:gap-x-32 lg:flex-row lg:gap-x-10 lg:justify-center ">
        <div className="min-w-min mt-0">
          <div>
            <div className="flex justify-center">
              <Image src={Ch1} width={184} height={192} />
            </div>
            <h2 className="text-center text-2xl text-gray-500">第 1 章</h2>
            <h2 className="text-center">重返 React 星</h2>
          </div>
          <div className="flex justify-center">
            <a
              href="https://codesandbox.io/s/react-mental-models-book-chapter1-pl524"
              target="_blank"
            >
              <button className="text-white rounded-full bg-gradient-to-b from-blue-800 to-indigo-900 w-48 h-12 text-xl m-4 tracking-widest">
                查看代码
              </button>
            </a>
          </div>
        </div>

        <div className="min-w-min mt-0">
          <div>
            <div className="flex justify-center">
              <Image src={Ch2} width={184} height={192} />
            </div>
            <h2 className="text-center text-2xl text-gray-500">第 2 章</h2>
            <h2 className="text-center">摩组城</h2>
          </div>
          <div className="flex justify-center">
            <a
              href="https://codesandbox.io/s/react-book-chapter-2-order-system-8eutc"
              target="_blank"
            >
              <button className="text-white rounded-full bg-gradient-to-b from-blue-800 to-indigo-900 w-48 h-12 text-xl m-4 tracking-widest">
                查看代码
              </button>
            </a>
          </div>
        </div>

        <div className="min-w-min mt-0">
          <div>
            <div className="flex justify-center">
              <Image src={Ch3} width={184} height={192} />
            </div>
            <h2 className="text-center text-2xl text-gray-500">第 3 章</h2>
            <h2 className="text-center">瑞海惊魂</h2>
          </div>
          <div className="flex justify-center">
            <a
              href="https://codesandbox.io/s/react-mental-modesl-book-chapter3-ebnry"
              target="_blank"
            >
              <button className="text-white rounded-full bg-gradient-to-b from-blue-800 to-indigo-900 w-48 h-12 text-xl m-4 tracking-widest">
                查看代码
              </button>
            </a>
          </div>
        </div>

        <div className="min-w-min mt-0">
          <div>
            <div className="flex justify-center">
              <Image src={Ch4} width={184} height={192} />
            </div>
            <h2 className="text-center text-2xl text-gray-500">第 4 章</h2>
            <h2 className="text-center">灵缘幻境</h2>
          </div>
          <div className="flex justify-center">
            <a href="https://github.com/lintonye/github-jobs3" target="_blank">
              <button className="text-white rounded-full bg-gradient-to-b from-blue-800 to-indigo-900 w-48 h-12 text-xl m-4 mb-0 tracking-widest">
                查看代码
              </button>
            </a>
          </div>
          <div className="mb-8">
            <p className="text-center text-gray-600 font-normal text-sm p-3">
              <span className="text-2xl">↑</span>
              <br></br>
              其中的分支包含了该项目的构建步骤
              <br></br>最终结果位于
              <a
                className="underline text-blue-500"
                href="https://github.com/lintonye/github-jobs3/tree/use-react-query"
              >
                {' '}
                use-react-query 分支
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
