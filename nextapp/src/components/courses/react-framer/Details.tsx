import * as React from 'react'
import {
  Text,
  Box,
  Video,
  Link,
  Image,
} from '@/components/legacy-design-system'
import Icon from '@/components/legacy-design-system/Icon'
import GalaxyHole from './GalaxyHole'
import CardExpandVideo from './assets/card-expand.mp4'
import StockChartVideo from './assets/stock-chart.mp4'
import CircularProgressVideo from './assets/module12-svg.mp4'
import PadlockVideo from './assets/module7-animation-orchestration.mp4'
import ScrollParallaxVideo from './assets/scroll-parallax.mp4'
import ToggleVideo from './assets/toggle.mp4'
import CardExpandPoster from './assets/card-expand.mp4.jpg'
import StockChartPoster from './assets/stock-chart.mp4.jpg'
import CircularProgressPoster from './assets/module12-svg.mp4.jpg'
import PadlockPoster from './assets/module7-animation-orchestration.mp4.jpg'
import ScrollParallaxPoster from './assets/scroll-parallax.mp4.jpg'
import TogglePoster from './assets/toggle.mp4.jpg'
import SliderVideo from './assets/slider-skinny.mp4'
import SliderPoster from './assets/slider-skinny.mp4.jpg'
import Card3dVideo from './assets/card-3d.mp4'
import Card3dPoster from './assets/card-3d.mp4.jpg'
import SwipeVideo from './assets/module5-tinder-swipe.mp4'
import SwipePoster from './assets/module5-tinder-swipe.mp4.jpg'
import RadioGroupVideo from './assets/radio-group.mp4'
import RadioGroupPoster from './assets/radio-group.mp4.jpg'
import GettingStartedPoster from './assets/getting-started.png'
import MotionVideo from './assets/module11-motion.mp4'
import MotionPoster from './assets/module11-motion.mp4.jpg'
import SmileyPoster from './assets/smiley.png'

import Planet1Bg from './assets/planet1.svg'
import Planet2Bg from './assets/planet2.svg'
import Planet3Bg from './assets/planet3.svg'
import Planet1HighlightBg from './assets/planet1-highlight.svg'
import Planet2HighlightBg from './assets/planet2-highlight.svg'
import Planet3HighlightBg from './assets/planet3-highlight.svg'

import AdvancedPlanet1Bg from './assets/advanced-planet1.svg'
import AdvancedPlanet2Bg from './assets/advanced-planet2.svg'
import AdvancedPlanet1HighlightBg from './assets/advanced-planet1-highlight.svg'
import AdvancedPlanet2HighlightBg from './assets/advanced-planet2-highlight.svg'

import TitleBg1 from './assets/title-bg1.svg'
import TitleBg2 from './assets/title-bg2.svg'

import jsLogo from './assets/js-logo.svg'
import reactLogo from './assets/react-logo.svg'
import framerLogo from './assets/framer-logo.svg'

const topics = [
  { name: 'JavaScript', subTopics: ['Coding basics', 'ES6'], icon: jsLogo },
  {
    name: 'React',
    subTopics: ['Components, Hooks', 'State, Props'],
    icon: reactLogo,
  },
  {
    name: 'Framer',
    subTopics: ['Framer Motion', 'Overrides, Workflow'],
    icon: framerLogo,
  },
]

const linkPrefix = '/course-posts/prototyping-react-framer'

const modules = [
  {
    title: '5 FOUNDATION MODULES',
    type: 'title',
    color: 'black',
    backgroundImage: TitleBg1,
  },
  {
    type: 'foundation',
    name: 'Getting Started',
    js: 'coding fundamentals',
    react: 'JSX vs. HTML',
    poster: GettingStartedPoster,
    link: `${linkPrefix}/module1-getting-started`,
  },
  {
    type: 'foundation',
    name: 'Toggle',
    js: 'objects, functions, variables, arrays, array destructuring',
    react: 'styling components, the true face of JSX',
    framer: 'animate, transition, variants',
    video: ToggleVideo,
    poster: TogglePoster,
    link: `${linkPrefix}/module2-toggle`,
  },
  {
    type: 'foundation',
    name: 'Framer X Overrides',
    framer: 'overrides',
    video: CardExpandVideo,
    poster: CardExpandPoster,
  },
  {
    type: 'foundation',
    name: 'Slider',
    js: 'objects, scope, conditionals',
    react: 'component composition and communication',
    framer: 'drag, useAnimation, transform',
    video: SliderVideo,
    poster: SliderPoster,
    link: `${linkPrefix}/module3-slider`,
  },
  {
    type: 'foundation',
    name: 'Tinder Swipe',
    js: 'arrow function, ternary operator, array.map',
    react: 'hooks',
    framer: 'useMotionValue, useTransform, useSpring',
    video: SwipeVideo,
    poster: SwipePoster,
    link: `${linkPrefix}/module4-tinder-swipe`,
  },
  {
    title: '9 ADVANCED MODULES',
    type: 'title',
    color: 'white',
    backgroundImage: TitleBg2,
  },
  {
    type: 'advanced',
    name: 'Mouse Parallax',
    js: 'expressions, data types',
    react: 'onMouseMove, hooks',
    framer: 'useMotionValue, useTransform',
    video: Card3dVideo,
    poster: Card3dPoster,
    link: `${linkPrefix}/module5-mouse-parallax`,
  },
  {
    type: 'advanced',
    name: 'Radio Group',
    js: 'object destructuring',
    react: 'state, debugging, components are printers, custom hooks',
    framer: 'the true face of useCycle',
    video: RadioGroupVideo,
    poster: RadioGroupPoster,
    link: `${linkPrefix}/module6-react-state`,
  },
  {
    type: 'advanced',
    name: 'Animation Orchestration',
    js: 'async/await, promise',
    framer: 'stagger animation, keyframes',
    video: PadlockVideo,
    poster: PadlockPoster,
    link: `${linkPrefix}/module7-animation-orchestration`,
  },
  {
    type: 'advanced',
    name: 'Scroll Parallax',
    // js: "arrow function, data types",
    react: 'custom hooks',
    framer: 'useParallax hooks, useMotionValue',
    video: ScrollParallaxVideo,
    poster: ScrollParallaxPoster,
    link: `${linkPrefix}/module8-scroll-parallax`,
  },
  {
    type: 'advanced',
    name: 'Advanced Framer X',
    framer: 'property controls, design and code components',
    video: CardExpandVideo,
    poster: CardExpandPoster,
  },
  {
    type: 'advanced',
    name: 'Stock Chart',
    js:
      'import JSON, fetch data, iterate object, array functions, error handling',
    react: 'useEffect, conditional rendering',
    video: StockChartVideo,
    poster: StockChartPoster,
  },
  {
    type: 'advanced',
    name: 'Framer Motion',
    react: `mount and unmount, "key" prop`,
    framer: 'motion tags, AnimatePresence, positionTransition',
    video: MotionVideo,
    poster: MotionPoster,
  },
  {
    type: 'advanced',
    name: 'SVG Animations',
    // js: "DOM API, setInterval",
    // react: "useRef, useEffect",
    js: 'Math functions',
    framer: 'motion.path, pathLength, pathOffset, onPan',
    video: CircularProgressVideo,
    poster: CircularProgressPoster,
  },
  {
    type: 'advanced',
    name: 'Smiley In Motion',
    // js: "DOM API, setInterval",
    // react: "useRef, useEffect",
    // js: "Math functions",
    framer: 'An in-depth, 26-part Framer Motion course (click to see details)',
    // video: SmileyVideo,
    poster: SmileyPoster,
    link: `https://smileyinmotion.com`,
  },
]

function Planet({
  index,
  type,
  playVideo,
  video,
  poster,
  link,
  ...props
}: any) {
  const planetBgs = playVideo
    ? [Planet1HighlightBg, Planet2HighlightBg, Planet3HighlightBg]
    : [Planet1Bg, Planet2Bg, Planet3Bg]
  const videoTag = video ? (
    <Video
      play={playVideo}
      videoUrl={video}
      posterUrl={poster}
      width={450}
      maxWidth={450}
      src={video}
      style={{
        borderRadius: 300,
      }}
    />
  ) : (
    <Image
      src={poster}
      size={450}
      style={{
        height: 250,
        borderRadius: 300,
      }}
    />
  )
  return (
    <Box
      // width={220}
      // height={220}
      backgroundImage={`url(${planetBgs[index % planetBgs.length]})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      mr={4}
      {...props}
    >
      <Box
        borderRadius="round"
        width={230}
        height={230}
        overflow="hidden"
        // border="12px solid #FFF"
        // boxShadow="0 0 0 1px #A3A7CD"
        // boxShadow={hovered ? "hover" : "normal"}
        layout="flex"
        mx={6}
        my={3}
        justifyContent="center"
        alignItems="center"
        position="relative"
        css={{
          '& > *': {
            flexShrink: 0,
          },
        }}
      >
        {link ? <Link to={link}>{videoTag}</Link> : videoTag}
      </Box>
    </Box>
  )
}

function ModuleDetail({ logo, text, align }: any) {
  return (
    <Box
      layout="flex"
      flexDirection={['row', align === 'left' ? 'row' : 'row-reverse']}
      alignItems="center"
      mb={1}
    >
      <img src={logo} />
      <Text
        as="h4"
        textVariant="body"
        color="secondaryText"
        textAlign={['left', align]}
        ml={1}
        mr={1}
      >
        {text}
      </Text>
    </Box>
  )
}

function Module({
  type,
  name,
  index,
  link,
  js,
  react,
  framer,
  video,
  poster,
  hovered,
  imageFirst,
  onHoverStart,
  onHoverEnd,
}: any) {
  const textAlign = imageFirst ? 'left' : 'right'
  return (
    <Box
      layout="flex"
      flexDirection={['column', imageFirst ? 'row' : 'row-reverse']}
      justifyContent="center"
      alignItems="center"
      mb={5}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <Planet
        index={index}
        type={type}
        mb={[3, 0]}
        video={video}
        poster={poster}
        playVideo={hovered}
        link={link}
      />
      <Box maxWidth={[250, 400]} mr={4}>
        <Text as="h3" textVariant="h3" textAlign={['center', textAlign]} mb={1}>
          <strong>{name}</strong>
        </Text>
        {js && (
          <ModuleDetail
            logo={jsLogo}
            text={js}
            align={imageFirst ? 'left' : 'right'}
          />
        )}
        {react && (
          <ModuleDetail
            logo={reactLogo}
            text={react}
            align={imageFirst ? 'left' : 'right'}
          />
        )}
        {framer && (
          <ModuleDetail
            logo={framerLogo}
            text={framer}
            align={imageFirst ? 'left' : 'right'}
          />
        )}
      </Box>
    </Box>
  )
}

function Title({ color, backgroundImage, title }: any) {
  return (
    <Box
      layout="flex"
      justifyContent="left"
      alignItems="center"
      py={7}
      backgroundImage={`url(${backgroundImage})`}
      backgroundPosition="16px center"
      backgroundRepeat="no-repeat"
    >
      <Text textVariant="h4" ml={50} color={color}>
        {title}
      </Text>
    </Box>
  )
}

function Modules() {
  const [hoveredIndex, setHoveredIndex] = React.useState(-1)
  return (
    <>
      {modules.map((module, idx) =>
        module.type === 'title' ? (
          <Title key={idx} {...module} />
        ) : (
          <Module
            key={idx}
            index={idx}
            {...module}
            hovered={hoveredIndex === idx}
            onHoverStart={() => setHoveredIndex(idx)}
            onHoverEnd={() => setHoveredIndex(-1)}
            imageFirst={idx % 2 === 0}
          />
        ),
      )}
    </>
  )
}

function Topics() {
  return (
    <Box
      layout="flex"
      flexDirection="row"
      mx="auto"
      flexWrap="wrap"
      mt={0}
      justifyContent="center"
    >
      {topics.map(({ name, subTopics, icon }) => (
        <Box
          key={name}
          mx={[4, 6]}
          mb={[5, 7]}
          layout="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box width={[80, 100]} height={[80, 100]}>
            <img src={icon} alt={name} width={'100%'} />
          </Box>
          {subTopics.map((st) => (
            <Text as="h3" key={st} textAlign="center" textVariant="body">
              {st}
            </Text>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default function Details() {
  return (
    <Box my={[0, 9]}>
      <Box
        maxWidth={860}
        mx="auto"
        layout="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          layout="flex"
          flexDirection={['column', 'row']}
          justifyContent="center"
          alignItems="center"
          mb={3}
        >
          <h2>
            <GalaxyHole
              galaxy={['mobileSmall2', 'small2']}
              className="inline-block"
            >
              <Text textVariant="h2" color="white">
                Save Time!{' '}
              </Text>
            </GalaxyHole>
            <Text
              textVariant="h2"
              as="span"
              ml={[0, 3]}
              mt={[-1, 4]}
              style={{ textShadow: '0 0 1px white, 0 0 2px white' }}
            >
              Only learn what’s necessary!
            </Text>
          </h2>
        </Box>
        <Text
          textAlign="center"
          textVariant="h4"
          width={[1, 3 / 4, 2 / 3]}
          maxWidth={500}
          m="auto"
          mt={0}
          mb={[4, 7]}
          color="secondaryText"
        >
          14 modules, 25 hand-picked examples
        </Text>
        <Topics />
        <Modules />
      </Box>
    </Box>
  )
}
