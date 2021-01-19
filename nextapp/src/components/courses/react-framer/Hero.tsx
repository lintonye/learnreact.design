import * as React from 'react'
import {
  Box,
  Text,
  Video,
  Header,
  Image,
  Link,
} from '@/components/legacy-design-system'
import { withDelayFramerHack } from '@/components/legacy-design-system/withDelayFramerHack'
import BoardButtonWrap from '@/components/legacy-design-system/BoardButtonGatsbyWrap'
import { Location } from '@reach/router'

import heroDemoVideo from './assets/hero-demos.mp4'
import heroDemoPoster from './assets/hero-demos.mp4.jpg'
import rocketBg from './assets/rocket-bg.png'
import rocketBgMobile from './assets/rocket-bg-mobile.png'
import beforeBgMobile from './assets/before-bg-mobile.svg'
import beforeBg from './assets/before-bg.svg'
import courseLogo from './assets/course-logo.svg'
import GalaxyHole from './GalaxyHole'
import playSvg from './assets/play.svg'

const BoardButton = withDelayFramerHack(BoardButtonWrap)

function Titles(props) {
  return (
    <Box
      {...props}
      layout="flex"
      flexDirection="column"
      alignItems={['center', 'flex-start']}
    >
      <Image src={courseLogo} size={[40, 60]} mb={[2, 0]} />
      <Text
        as="h1"
        textVariant="courseTitleHeader"
        mb={5}
        textAlign={['center', 'left']}
      >
        Prototyping With <br />
        React + Framer
      </Text>
      <Text
        // as="h4"
        color="secondaryText"
        mt={-2}
        // mb={0}
        textAlign={['center', 'left']}
        textVariant="h4"
      >
        An expedited ride to a new galaxy of creativity
      </Text>
    </Box>
  )
}

function Modal({ children, ...props }) {
  return (
    <Box
      {...props}
      style={{
        position: 'fixed',
        width: '100vw',
        left: 0,
        top: 0,
        height: '100vh',
        background: 'rgba(0,0,0,0.7)',
        zIndex: 100,
        overflow: 'hidden',
        pointerEvents: 'auto',
        '-webkit-overflow-scrolling': 'touch',
      }}
      onClick={() => props.onClose()}
    >
      {children}
    </Box>
  )
}

function YoutubeVideoModal({ onClose, ...props }) {
  const youtubeId = 'MHQ40KiJ1wU'
  const mute = false
  const loop = false
  const autoPlay = true
  return (
    <Modal
      layout="flex"
      justifyContent="center"
      alignItems="center"
      onClose={onClose}
    >
      <Box
        width={[400, 800, 1000]}
        height={[400, 800, 1000].map((w) => (w / 16) * 9)}
        maxWidth="100%"
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&controls=1&showinfo=0&autoplay=${
            autoPlay ? 1 : 0
          }&loop=${loop ? 1 : 0}&mute=${mute ? 1 : 0}`}
          frameBorder="0"
          title="welcome"
          allowFullScreen
        />
      </Box>
    </Modal>
  )
}

function WelcomeVideo() {
  const [modalOpen, setModalOpen] = React.useState(false)
  return (
    <>
      <Box
        style={{
          border: '8px solid white',
          borderRadius: 16,
          cursor: 'pointer',
        }}
        width={300}
        height={169}
        layout="flex"
        justifyContent="center"
        alignItems="center"
        onClick={() => setModalOpen(true)}
      >
        <Image src={playSvg} size={60} />
      </Box>
      {modalOpen && <YoutubeVideoModal onClose={() => setModalOpen(false)} />}
    </>
  )
}

function WhatYouWillBuild(props) {
  return (
    <GalaxyHole {...props} galaxy={['mobileHero', 'hero']}>
      <Box
        layout="grid"
        gridTemplateColumns="auto"
        justifyItems="center"
        gridGap={[2, 2, 5]}
      >
        <Text textVariant="body" color="white">
          What you'll build
        </Text>
        <WelcomeVideo />
        {/* <Video
          videoUrl={heroDemoVideo}
          posterUrl={heroDemoPoster}
          width={300}
          style={{
            border: "8px solid white",
            borderRadius: 16
          }}
        /> */}
        <Location>
          {({ location: { pathname } }) => {
            const enrollLink = `${pathname}#pricing`
            return (
              <Link to={enrollLink} underline={false}>
                <BoardButton>
                  <Text textVariant="body">BOARD NOW</Text>
                </BoardButton>
              </Link>
            )
          }}
        </Location>
      </Box>
    </GalaxyHole>
  )
}

function StartingPoint(props) {
  return (
    <Box {...props} position="relative" mt={[4, 9]} ml={[6, 0]}>
      <Image
        src={[beforeBgMobile, beforeBg]}
        position="absolute"
        top={[-60, -170]}
        left={[-43, -100]}
        width={[364, 590]}
        height={[189, 400]}
        zIndex={-1}
      />
      <Box mb={8} width={[250, 300]} color="secondaryText">
        <Text textVariant="h4" mb={2}>
          Are you familiar with HTML/CSS but new to <strong>JavaScript</strong>{' '}
          or <strong>React</strong>?
        </Text>
        <Text textVariant="h4">This course is tailored for you!</Text>
      </Box>
    </Box>
  )
}

export default function Hero(props) {
  return (
    <Box
      layout="grid"
      gridTemplateColumns={[
        '100vw',
        'minmax(36px,1fr) minmax(320px, 0.5fr) 480px minmax(36px,1fr)',
        '1fr minmax(500px, 0.5fr) 600px 1fr',
      ]}
      overflow="hidden"
      // my={8}
      // mx="auto"
      // px={2}
      // width={[1, 600, 900]}
      {...props}
    >
      <Box gridColumn={[1, '1 / span 2']} gridRow={[1]}>
        <Location>
          {({ location: { pathname } }) => {
            const enrollLink = `${pathname}#pricing`

            return (
              <Header
                extraLinks={[{ title: '➜ Board Now!', link: enrollLink }]}
              />
            )
          }}
        </Location>
      </Box>
      <Titles my={[2, 8]} mr={[0, 6]} gridColumn={[1, 2]} gridRow={[2, 1]} />
      <WhatYouWillBuild gridColumn={[1, 3]} gridRow={[3, 1]} />
      <Image
        src={[rocketBgMobile, rocketBg]}
        width={[171, 430, 570]}
        height={[304, (430 * 500) / 570, 500]}
        gridColumn={[1, 3]}
        gridRow={[4, 2]}
        mt={[-12, -130, -200]}
        ml={[220, -100, -280]}
        mb={[-9, 0]}
        zIndex={0}
      />
      <StartingPoint gridColumn={[1, 2]} gridRow={[5, 2]} />
    </Box>
  )
}
