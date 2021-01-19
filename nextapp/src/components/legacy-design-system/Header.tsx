import * as React from 'react'
import { Box, Link } from '.'
import Icon from './Icon'
import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import Headroom from 'react-headroom'
import logoDark from './assets/logo-dark.svg'
// import logoLight from "./assets/logo-light.svg";
import { animated, useTransition } from 'react-spring'

const Container = styled.div`
  .mobile-header {
    display: block;
  }
  .desktop-header {
    display: none;
  }
  @media screen and (min-width: ${themeGet('breakpoints.1')}) {
    .mobile-header {
      display: none;
    }
    .desktop-header {
      display: block;
    }
  }
`

const LogoImg = styled.img`
  /* margin-top: -8px; */
`

function Logo() {
  return (
    <Link to="/" m={1}>
      <LogoImg width={40} height={40} src={logoDark} />
    </Link>
  )
}

const links = (extraLinks = []) => [
  // { title: "Home", link: "/" },
  { title: 'Courses', link: '/#enroll' },
  {
    title: 'Workshops',
    link: '/challenges/bored-at-home-react/',
    // highlight: true,
  },
  // { title: "Workshops", link: "/workshops/react-mental-models-1" },
  { title: 'Tips', link: '/tips' },
  { title: 'Webinars', link: '/webinars' },
  { title: 'Blog', link: '/blog' },
  ...extraLinks,
]

function HeaderMenuExpanded({ extraLinks, onIconClicked }) {
  return (
    <Box
      layout="flex"
      flexDirection="column"
      pl={4}
      pt={4}
      width="100vw"
      height="100vh"
      bg="menuBg"
      boxShadow="hoverColorable"
      color="shadow"
    >
      <Box p={2} mt={-2} ml={-2} onClick={onIconClicked}>
        <Icon height={28} iconName="Icon_close" width={29} />
      </Box>
      {links(extraLinks).map(({ title, link }) => (
        <Box mt={4}>
          <Link textVariant="body" width={1} to={link} key={link}>
            {title}
          </Link>
        </Box>
      ))}
    </Box>
  )
}

function HeaderMenuFolded({ onIconClicked }) {
  return (
    <Box
      alignItems="center"
      alignItemsGrid="stretch"
      backgroundImage="url(http://127.0.0.1:4567/)"
      backgroundSize="cover"
      color="primary"
      gridTemplateColumns="auto 1fr"
      height={null}
      justifyItems="center"
      layout="grid"
      m={0}
      p={2}
      width={1}
      bg="translucentBg"
    >
      <Box
        p={2}
        mt={-1}
        ml={-2}
        onClick={onIconClicked}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Icon
          height={28}
          iconName="Icon_burger"
          width={29}
          onClick={onIconClicked}
        />
      </Box>
      <Box
        alignItems="center"
        backgroundImage="url(http://127.0.0.1:4567/)"
        backgroundSize="cover"
        color="primary"
        height={null}
        layout="flex"
        m={0}
        p={0}
      >
        <Logo />
        <Link
          color="primary"
          height={null}
          mb={0}
          ml={3}
          mr={0}
          mt={0}
          p={0}
          textVariant="body"
          width={1}
          to="/"
        >
          learnreact.design
        </Link>
      </Box>
    </Box>
  )
}

function HighlightBubble(props) {
  return (
    <Box
      width={5}
      height={5}
      display="inline-block"
      ml={'5px'}
      mb={'5px'}
      backgroundColor="accent"
      borderRadius="50%"
    />
  )
}

function HeaderDesktop({ extraLinks }) {
  return (
    <Box
      alignItemsGrid="center"
      justifyContent="flex-start"
      justifyItems="start"
      layout="grid"
      gridGap={4}
      gridAutoFlow="column"
      // gridAutoColumns="min-content"
      p={1}
      bg="translucentBg"
      width={1}
    >
      <Logo />
      {links(extraLinks).map(({ title, link, highlight }) => (
        <Link textVariant="body" to={link} key={link}>
          {title}
          {highlight && <HighlightBubble />}
        </Link>
      ))}
    </Box>
  )
}

export default function Header({ extraLinks = [], ...props }) {
  const [expanded, setExpanded] = React.useState(false)
  const toggleExpanded = () => setExpanded(!expanded)
  const transitions = useTransition(expanded, null, {
    from: {
      transform: 'translateX(-200vw)',
      position: 'fixed',
      zIndex: 100,
    },
    enter: { transform: 'translateX(0)' },
    leave: { transform: 'translateX(-200vw)' },
  })
  return (
    <Container>
      <div className="mobile-header">
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div style={props}>
                <HeaderMenuExpanded
                  extraLinks={extraLinks}
                  onIconClicked={toggleExpanded}
                />
              </animated.div>
            ),
        )}
        <header>
          <Headroom>
            <HeaderMenuFolded onIconClicked={toggleExpanded} />
          </Headroom>
        </header>
      </div>
      <div className="desktop-header">
        <header>
          <Headroom>
            <HeaderDesktop extraLinks={extraLinks} />
          </Headroom>
        </header>
      </div>
    </Container>
  )
}
