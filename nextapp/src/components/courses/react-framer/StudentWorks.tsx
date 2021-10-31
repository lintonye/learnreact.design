import * as React from 'react'
import { Box, Text, Link } from '@/components/legacy-design-system'
import GalaxyHole from './GalaxyHole'
import { getFeaturedWorks } from './StudentWorksData'
import StudentWork from './StudentWork'
import lightBubbleBg from './assets/light-bubble-bg.svg'
import { Location } from '@reach/router'

const featuredWorks = getFeaturedWorks(3)

export default function StudentWorks() {
  const [hoverIdx, setHoverIdx] = React.useState(-1)
  return (
    <Box my={[7, 8]}>
      <Box layout="flex" justifyContent="center" alignItems="center" mb={4}>
        <h2>
          <Text as="span" textVariant="h2" mr={0}>
            By{' '}
          </Text>
          <GalaxyHole
            galaxy={['mobileSmall1', 'small1']}
            mt={-3}
            className="inline-block"
          >
            <Text as="span" textVariant="h2" color="white">
              Previous Students
            </Text>
          </GalaxyHole>
        </h2>
      </Box>
      <Box
        layout="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        maxWidth={1200}
        mx="auto"
      >
        {featuredWorks.map((work: any, idx: number) => (
          <StudentWork
            key={idx}
            {...work}
            hovered={idx === hoverIdx}
            onHoverStart={() => setHoverIdx(idx)}
            onHoverEnd={() => setHoverIdx(-1)}
            mb={[0, 4]}
          />
        ))}
      </Box>
      <Box
        backgroundImage={`url(${lightBubbleBg})`}
        width={240}
        height={52}
        alignSelf="flex-end"
        mx="auto"
        p={3}
        pl={5}
        mt={[-2, 3]}
      >
        <Location>
          {({ location: { pathname } }) => (
            <Link to={`/courses/react-framer/showcase`}>
              <Text as="h3" textVariant="small" textAlign="center" mt={'4px'}>
                <strong>MORE SHOWCASES</strong>
              </Text>
            </Link>
          )}
        </Location>
      </Box>
    </Box>
  )
}
