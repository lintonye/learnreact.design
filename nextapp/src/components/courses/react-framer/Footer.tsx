import * as React from 'react'
import { Image, Box, Link, Text } from '../../design-system'
import footerBg from './assets/footer-bg.svg'
import siteLogo from './assets/site-logo-dark.svg'
import { ThemeProvider } from 'styled-components'
import { spaceDark } from '../../design-system/theme'

function BottomLink({ label, to }) {
  return (
    <Link to={to}>
      <Text textVariant="body" ml={3}>
        {label}
      </Text>
    </Link>
  )
}

export default function Footer(props) {
  return (
    <ThemeProvider theme={spaceDark}>
      <Box
        position="relative"
        width={1}
        layout="grid"
        gridTemplateColumns="1fr auto"
        backgroundImage={`url(${footerBg})`}
        backgroundPosition={['-480px 32px', '-180px 32px']}
        backgroundRepeat="no-repeat"
        alignItems="end"
        pt={150}
        pr={[4, 8]}
        pl={[4, 10]}
        pb={2}
        {...props}
      >
        <Box
          layout="flex"
          justifyContent={['space-between', 'flex-start']}
          gridColumn={['span 2', 1]}
        >
          <BottomLink label="Home" to="/" />
          <BottomLink label="Courses" to="/#enroll" />
          <BottomLink label="Tips" to="/tips" />
          <BottomLink label="Webinars" to="/webinars" />
          <BottomLink label="Blog" to="/blog" />
        </Box>
        <Image
          src={siteLogo}
          width={186}
          height={52}
          gridRow={2}
          gridColumn={1}
        />
        <Box gridRow={2} gridColumn={2} alignSelf="end" pb={[1, 0]}>
          <Text textVariant="body" color="secondaryText">
            © {new Date().getFullYear()} jimu Labs Inc.
          </Text>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
