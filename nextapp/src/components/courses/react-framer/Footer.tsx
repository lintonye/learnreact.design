import * as React from 'react'
import { Image, Box, Link, Text } from '@/components/legacy-design-system'
import footerBg from './assets/footer-bg.svg'
import siteLogo from './assets/site-logo-dark.svg'
import { ThemeContext } from '@emotion/core'
import { spaceDark } from '@/components/legacy-design-system/theme'

function BottomLink({ label, to }: any) {
  return (
    <Link to={to}>
      <Text textVariant="small" ml={3} color="secondaryText">
        {label}
      </Text>
    </Link>
  )
}

export default function Footer(props: any) {
  return (
    <ThemeContext.Provider value={spaceDark}>
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
          as="nav"
          layout="flex"
          justifyContent={['space-between', 'flex-start']}
          gridColumn={['span 2', 1]}
        >
          <BottomLink label="Home" to="/" />
          <BottomLink label="Courses" to="/courses" />
          <BottomLink label="Posts" to="/posts" />
          <BottomLink label="Webinars" to="/webinars" />
          {/* <BottomLink label="Blog" to="/blog" /> */}
        </Box>
        <Image
          src={siteLogo}
          width={186}
          height={52}
          gridRow={2}
          gridColumn={1}
        />
        <Box gridRow={2} gridColumn={2} alignSelf="end" pb={[1, 0]}>
          <Text textVariant="small" color="secondaryText">
            © {new Date().getFullYear()} jimu Labs Inc.
          </Text>
        </Box>
      </Box>
    </ThemeContext.Provider>
  )
}
