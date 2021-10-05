import { BookPreview } from '../../../components/courses/react-mental-models/BookPreview'
import modelPng1_1 from '../../../components/courses/react-mental-models/images/1.1.png'
import modelPng1_2 from '../../../components/courses/react-mental-models/images/1.2.png'
import modelPng1_4 from '../../../components/courses/react-mental-models/images/1.4.png'
import modelPng1_5 from '../../../components/courses/react-mental-models/images/1.5.png'
import modelPng1_6 from '../../../components/courses/react-mental-models/images/1.6.png'
import modelPng1_7 from '../../../components/courses/react-mental-models/images/1.7.png'
import modelPng2_1 from '../../../components/courses/react-mental-models/images/2.1.png'
import modelPng2_2 from '../../../components/courses/react-mental-models/images/2.2.png'
import modelPng2_3 from '../../../components/courses/react-mental-models/images/2.3.png'
import modelPng2_4 from '../../../components/courses/react-mental-models/images/2.4.png'
import modelPng2_5 from '../../../components/courses/react-mental-models/images/2.5.png'
import modelPng2_6 from '../../../components/courses/react-mental-models/images/2.6.png'
import modelPng3_2 from '../../../components/courses/react-mental-models/images/3.2.png'
import modelPng3_3 from '../../../components/courses/react-mental-models/images/3.3.png'
import modelPng3_4 from '../../../components/courses/react-mental-models/images/3.4.png'
import modelPng3_5 from '../../../components/courses/react-mental-models/images/3.5.png'
import modelPng3_6 from '../../../components/courses/react-mental-models/images/3.6.png'
import modelPng3_7 from '../../../components/courses/react-mental-models/images/3.7.png'
import modelPng3_8 from '../../../components/courses/react-mental-models/images/3.8.png'

const sections = [
  {
    id: '1.1',
    modelImage: modelPng1_1,
    title: '墙上的洞',
    subtitle: 'HTML 上凿洞，动态数据露脸',
  },
  {
    id: '1.2',
    modelImage: modelPng1_2,
    title: '仪式之二',
    subtitle: '声明式与响应式界面编程',
  },
  {
    id: '1.4',
    modelImage: modelPng1_4,
    title: '拍照墙的伪装',
    subtitle: 'JSX 是伪装成 HTML 的 JS',
  },
  {
    id: '1.5',
    modelImage: modelPng1_5,
    title: '手翻书',
    subtitle: '一次组件渲染、一页手翻书',
  },
  {
    id: '1.6',
    modelImage: modelPng1_6,
    title: '诱饵',
    subtitle: 'JSX 中大括号内应放表达式',
  },
  {
    id: '1.7',
    modelImage: modelPng1_7,
    title: '不能修葺的房子',
    subtitle: 'React 数据的不可变约定',
  },
  {
    id: '2.1',
    modelImage: modelPng2_1,
    title: '组件的模块化思维',
    subtitle: '分而治之、模块组合、代码重用',
  },
  {
    id: '2.2',
    modelImage: modelPng2_2,
    title: '组件的组合',
    subtitle: '组件灵活的组合方式',
  },
  {
    id: '2.3',
    modelImage: modelPng2_3,
    title: '周而复始的面试',
    subtitle: '组件内的时间循环',
  },
  {
    id: '2.4',
    modelImage: modelPng2_4,
    title: '传送工程师的接力',
    subtitle: '组件间的单向数据流',
  },
  {
    id: '2.5',
    modelImage: modelPng2_5,
    title: '单向电梯',
    subtitle: 'Context：数据直达目的地',
  },
  {
    id: '2.6',
    modelImage: modelPng2_6,
    title: '便携式虫洞',
    subtitle: '用回调函数从下往上传递数据',
  },
  {
    id: '3.2',
    modelImage: modelPng3_2,
    title: '遭遇胡克船长',
    subtitle: 'Hook 为组件“勾”回新功能',
  },
  {
    id: '3.3',
    modelImage: modelPng3_3,
    title: '风向急变',
    subtitle: 'Hook 保存组件内部数据',
  },
  {
    id: '3.4',
    modelImage: modelPng3_4,
    title: '尤日伊费克特大副',
    subtitle: 'useEffect 与生命周期回调方法',
  },
  {
    id: '3.5',
    modelImage: modelPng3_5,
    title: '大副的真正职责',
    subtitle: '使用 useEffect 管理组件副作用',
  },
  {
    id: '3.6',
    modelImage: modelPng3_6,
    title: '戒律清规',
    subtitle: 'Hook 的两条使用规则',
  },
  {
    id: '3.7',
    modelImage: modelPng3_7,
    title: '条件扔钩',
    subtitle: '既不违规，又有条件地调用 Hook',
  },
  {
    id: '3.8',
    modelImage: modelPng3_8,
    title: '铁钩特勤编队',
    subtitle: '自定义 Hook，重用状态逻辑',
  },
]
export default function Book() {
  return (
    <BookPreview
      sections={sections}
      title="坐标 React 星"
      subtitle="一本伪装成小说的 React 开发指南"
      startButtonText="起 航"
    />
  )
}
