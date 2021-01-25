import * as React from 'react'
import Box from './Box'
import Text from './Text'
import lintonProfilePhoto from '@/assets/linton.jpg'
import beebeeProfilePhoto from '@/assets/beebee.jpg'
import ProfilePhoto from './ProfilePhoto'
import cometUpBg from './assets/comet-up-bg.svg'
import cometDownBg from './assets/comet-down-bg.svg'

function Bio({
  greeting,
  description,
  twitterId,
  email,
  photo,
  cometBgDirection,
  ...rest
}: any) {
  return (
    <Box
      maxWidth={800}
      mx="auto"
      layout="grid"
      gridTemplateColumns={['auto', 'auto 1fr']}
      justifyItems={['center', 'start']}
      gridColumnGap={6}
    >
      <Box style={{ gridRow: 'span 2', position: 'relative' }} mr={2}>
        {cometBgDirection && (
          <Box
            position="absolute"
            zIndex={0}
            {...(cometBgDirection === 'down'
              ? { right: -30, top: [-679] }
              : { right: -30, top: -30 })}
          >
            <img
              src={cometBgDirection === 'down' ? cometDownBg : cometUpBg}
              width={600}
              css={{ maxWidth: 600 }}
            />
          </Box>
        )}

        <ProfilePhoto
          size={[150, 150]}
          url={photo}
          mb={4}
          position="relative"
        />
        {/* {`https://twitter.com/${twitterId}`} */}
      </Box>
      <Text textVariant="h2" mt={[4, -2]} style={{ zIndex: 1 }}>
        {greeting}
      </Text>
      <Text
        textVariant="body"
        color="secondaryText"
        style={{ zIndex: 1 }}
        className="space-y-5"
      >
        {description}
      </Text>
    </Box>
  )
}

export default function Bios({ bg = 'secondaryBg', cometBg = false }) {
  return (
    <Box bg={bg} py={[6, 8]} px={4} layout="grid" gridRowGap={6}>
      <Bio
        greeting="Hi! I'm Linton!"
        description={
          <>
            <p>
              I'm a full-stack developer and I love design. I've been teaching
              designers React since 2017 and I'm loving it! I'm also the author
              of a couple of courses at Treehouse and Lynda.
            </p>
            <p>
              My dark little secret: 😈 creating this course is also my special
              way to learn all things about design and React -- trying to
              explain things clearly has taken my understanding of the concepts
              to a whole new level.
            </p>
            <p>Thrilled to be on this journey with you!</p>
          </>
        }
        twitterId="lintonye"
        email="linton@jimulabs.com"
        photo={lintonProfilePhoto}
        cometBgDirection={cometBg && 'down'}
      />
      <Bio
        greeting="Hey! I'm Beebee!"
        description={
          <>
            <p>
              I'm a designer and animator. I draw inspiration from my dream
              diaries.
            </p>
            <p>
              In my dreams, I saw mammoths chasing little bears on a circus. I
              managed to turn missiles launched from North Korea into splendid
              firework shows. I convinced the Emperor of Qin Dynasty to stop
              killing. I chatted with Prince Edwards in Chinese. I was left in
              awe by the weirdly breathtaking scenes made up of lily pads,
              lotus, water grass and pale dead fish...
            </p>
            <p>What's in your dreams?</p>
          </>
        }
        twitterId="beebeeye"
        email="beebeeye@gmail.com"
        photo={beebeeProfilePhoto}
        cometBgDirection={cometBg && 'up'}
      />
    </Box>
  )
}
