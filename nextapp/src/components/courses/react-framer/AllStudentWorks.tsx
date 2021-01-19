import * as React from 'react'
import { Box, Text } from '../../design-system'
import { getAllWorks } from './StudentWorksData'
import StudentWork from './StudentWork'
import GalaxyHole from './GalaxyHole'
import { spaceDark } from '../../design-system/theme'
import { ThemeProvider } from 'styled-components'
const works = getAllWorks()

function Banner() {
  return (
    <ThemeProvider theme={spaceDark}>
      <GalaxyHole galaxy="subPageHero" ml={[-9, -11]} mb={7}>
        <Text textVariant="h1" color="primaryText" textAlign="center">
          Student Work Showcase
        </Text>
      </GalaxyHole>
    </ThemeProvider>
  )
}

export default function AllStudentWorks(props) {
  const [activeIdx, setActiveIdx] = React.useState(-1)
  return (
    <Box width={1} overflow="hidden">
      <Banner />
      <Box
        layout="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        maxWidth={1200}
        mx="auto"
      >
        {works.map((work, idx) => (
          <StudentWork
            key={idx}
            {...work}
            hovered={idx === activeIdx}
            onHoverStart={() => setActiveIdx(idx)}
            onHoverEnd={() => setActiveIdx(-1)}
            mb={[0, 7]}
          />
        ))}
      </Box>
    </Box>
  )
}
