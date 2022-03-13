import { Layout } from '@/components/Layout'
import React from 'react'
import Cover from './book-cover.png'  
import Ch1 from './chapter1.png'
import Ch2 from './chapter2.png'
import Ch3 from './chapter3.png'
import Ch4 from './chapter4.png'
import Star from './React_star.png'
import Image from 'next/image'
import { FiAlignCenter } from 'react-icons/fi'

export default function BookHome() {
  return (
    <Layout>
      <div className="mx-auto min-h-screen ">
      <div className='bg-gradient-to-b from-gray-900 p-8'>
      <div className='flex'>
      <Image src={Star} width={104} height={100} /> 
      <h1 className='font-extrabold text-4xl p-1  text-white text-center sm:text-5xl sm:p-2'>坐标 React 星</h1></div>
      <h2 className='text-2xl p-1 m-2 text-white text-center sm:text-3xl sm:p-2'>React 开发核心思维模型</h2>
      <Image src={Cover} width={192} height={260} />
      <p className='text-center text-gray-500'>
        一本探索元宇宙世界的React力作 <br></br>
一本伪装成科幻小说的前端开发宝典<br></br>
一本带你建立React思维模型的编程秘籍 </p>
</div>
      <p className='p-8 font-normal'>本书通过一个奇幻故事的外壳讲解 React 开发必备的核心思维模型，即如何用 React 的独特方式思考 和解决问题。故事主角用“脑机”进入“Web 宇宙”，登陆“React 星”。通过体验各种离奇见闻，由浅入深地介绍 React 开发的核心知识点，例如声明式和响应式编程、不可变约定、单向数据流、组件组合的运 用、组件渲染特性、Hook 的基本原理和常见模式、组件构架设计和 State 管理，等等。

“让读者在娱乐中学习”，这是作者的初衷。为了帮助读者理解和记忆，本书为每一个思维模型都配 备了生动有趣的故事桥段和漫画插图。本书强调揭示各个概念的本质，不光展示“如何做”，更注重解释 “为什么”，并辅以实例操作，旨在打开一扇门——鼓励读者深挖基础知识，增强自行推演结论、进一步学习实战知识的能力。

本书主要适合对 HTML、CSS、JavaScript、DOM 有一定了解的前端开发者、设计师和高校学生等阅读。
</p>
<h1 className='text-4xl p-1 text-center'>书中代码下载</h1>
      <ul className='p-8'>
        <li>
          <a href="https://codesandbox.io/s/react-mental-models-book-chapter1-pl524" target="_blank">
          <Image src={Ch1} width={184} height={192} /> 
          <span className='text-center text-2xl text-gray-500' >第 1 章</span><br></br>
          重返 React 星 
          </a>
        </li>
        <li>
          <a href="https://codesandbox.io/s/react-book-chapter-2-order-system-8eutc" target="_blank">
          <Image src={Ch2} width={184} height={192} />
          <span className='text-center text-2xl text-gray-500' >第 2 章</span>  <br></br>
          摩组城
          </a>
        </li>
        <li>
          
          <a href="https://codesandbox.io/s/react-mental-modesl-book-chapter3-ebnry" target="_blank">
          <Image src={Ch3} width={184} height={192} /> 
          <span className='text-center text-2xl text-gray-500' >第 3 章</span><br></br>
          瑞海惊魂
          </a>
        </li>
        <li>
          
          <a href="https://github.com/lintonye/github-jobs3" target="_blank">
            <Image src={Ch4} width={184} height={192} />
            <span className='text-center text-2xl text-gray-500' >第 4 章</span><br></br>
            灵缘幻境
            </a>
          <p>
            其中的分支包含了该项目的构建步骤。最终结果位于{' '}
            <a href="https://github.com/lintonye/github-jobs3/tree/use-react-query">
              use-react-query
            </a>
          </p>
        </li>
      </ul>
      </div>
    </Layout>
  )
}
