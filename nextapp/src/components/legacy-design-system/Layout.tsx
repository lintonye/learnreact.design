import * as React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Box, Text } from '.'
import { themeGet } from '@styled-system/theme-get'
import * as themes from './theme'
// import { CourseEvents } from '../new-components/CourseEvents'
import { MDXProvider } from '@mdx-js/react'
import 'prismjs/themes/prism.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: ${themeGet('colors.primaryText', 'black')};
    background-color: ${themeGet('colors.primaryBg', 'white')};
    /* transition: background-color 0.2s ease, color 0.2s ease;
    div {
      transition: background-color 0.2s ease, color 0.2s ease;      
    }
    input {
      transition: background-color 0.2s ease, color 0.2s ease;
    } */
  }
`

function Footer() {
  return (
    <Box p={4} bg="black">
      <Text
        textVariant="footerBg"
        m="auto"
        textAlign="center"
        color="secondaryText"
      >
        © {new Date().getFullYear()} jimu Labs, Inc.
      </Text>
    </Box>
  )
}

export function ThemeWrapper({ theme = 'light', children, ...props }: any) {
  return (
    <MDXProvider
      components={{
        // Map HTML element tag to React component
        h1: (props) => <Text textVariant="h1" as="h1" {...props} />,
        h2: (props) => <Text textVariant="h2" as="h2" {...props} />,
        h3: (props) => <Text textVariant="h3" as="h3" {...props} />,
      }}
    >
      <ThemeProvider theme={themes[theme]}>
        {children}
        <GlobalStyle />
      </ThemeProvider>
    </MDXProvider>
  )
}

export default function Layout({
  children,
  footer = true,
  courseEvents = true,
  ...props
}: any) {
  return (
    <ThemeWrapper {...props}>
      <Box minHeight="95vh" {...props} m={0} p={0}>
        {children}
      </Box>
      {footer && <Footer />}
      {/* {courseEvents && <CourseEvents />} */}
    </ThemeWrapper>
  )
}
