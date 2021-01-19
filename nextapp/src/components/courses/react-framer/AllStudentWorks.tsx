import * as React from 'react'
import { Box, Text } from '@/components/legacy-design-system'
import { getAllWorks } from './StudentWorksData'
import StudentWork from './StudentWork'
import GalaxyHole from './GalaxyHole'
import { spaceDark } from '@/components/legacy-design-system/theme'
import { ThemeContext } from '@emotion/core'
const works = getAllWorks()

function Banner() {
  return (
    <ThemeContext.Provider value={spaceDark}>
      <GalaxyHole galaxy="subPageHero" ml={[-9, -11]} mb={7}>
        <Text textVariant="h1" color="primaryText" textAlign="center">
          Student Work Showcase
        </Text>
      </GalaxyHole>
    </ThemeContext.Provider>
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
