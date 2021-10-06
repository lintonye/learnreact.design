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
    x: 62,
    y: 238,
    title: '',
    subtitle: 'Carve holes on HTML. Reveal dynamic data behind.',
  },
  {
    id: '1.2',
    modelImage: modelPng1_2,
    x: 583,
    y: 22,
    title: 'The second ritual',
    subtitle: 'Declarative and Reactive UI',
  },
  {
    id: '1.4',
    modelImage: modelPng1_4,
    x: 533,
    y: 312,
    title: 'Behind the wall',
    subtitle: 'JSX is JS in disguise.',
  },
  {
    id: '1.5',
    modelImage: modelPng1_5,
    x: 500,
    y: 621,
    title: 'Flip book',
    subtitle: 'Render. Get a page in the book.',
  },
  {
    id: '1.6',
    modelImage: modelPng1_6,
    x: 375,
    y: 657,
    title: 'Bait',
    subtitle: 'Expressions inside the curly braces',
  },
  {
    id: '1.7',
    modelImage: modelPng1_7,
    x: 840,
    y: 867,
    title: 'Unrepairable house',
    subtitle: 'Immutability in React',
  },
  {
    id: '2.1',
    modelImage: modelPng2_1,
    x: 1221,
    y: 717,
    title: '',
    subtitle: 'Thinking in modules',
  },
  {
    id: '2.2',
    modelImage: modelPng2_2,
    x: 1406,
    y: 600,
    title: '',
    subtitle: 'Component composition',
  },
  {
    id: '2.3',
    modelImage: modelPng2_3,
    x: 1834,
    y: 461,
    title: 'Recurring interview',
    subtitle: 'The time loop inside components',
  },
  {
    id: '2.4',
    modelImage: modelPng2_4,
    x: 1842,
    y: 270,
    title: 'Relay race',
    subtitle: 'One-way data flow',
  },
  {
    id: '2.5',
    modelImage: modelPng2_5,
    x: 1955,
    y: 311,
    title: 'One-way elevator',
    subtitle: 'Context',
  },
  {
    id: '2.6',
    modelImage: modelPng2_6,
    x: 1937,
    y: 262,
    title: 'Portable portal',
    subtitle: 'Pass data upwards with callbacks',
  },
  {
    id: '3.2',
    modelImage: modelPng3_2,
    x: 1920,
    y: 1502,
    title: 'Captain Hook',
    subtitle: 'Scoop new features back to components',
  },
  {
    id: '3.3',
    modelImage: modelPng3_3,
    x: 1885,
    y: 1663,
    title: 'Changing winds',
    subtitle: 'Save component data with Hooks',
  },
  {
    id: '3.4',
    modelImage: modelPng3_4,
    x: 1732,
    y: 1642,
    title: 'Chief Mate',
    subtitle: 'useEffect and lifecycle methods',
  },
  {
    id: '3.5',
    modelImage: modelPng3_5,
    x: 1153,
    y: 1523,
    title: "Chief Mate's real job",
    subtitle: 'Manage side effects with useEffect',
  },
  {
    id: '3.6',
    modelImage: modelPng3_6,
    x: 1013,
    y: 1565,
    title: '',
    subtitle: 'The rules of Hooks',
  },
  {
    id: '3.7',
    modelImage: modelPng3_7,
    x: 869,
    y: 1502,
    title: '',
    subtitle: 'Use Hooks conditionally',
  },
  {
    id: '3.8',
    modelImage: modelPng3_8,
    x: 621,
    y: 1681,
    title: 'Squad Hook',
    subtitle: 'Reuse stateful logic with custom Hooks',
  },
]
export default function Book() {
  return (
    <BookPreview
      sections={sections}
      title="Planet React"
      subtitle="A story about React mental models"
      startButtonText="Start"
    />
  )
}
