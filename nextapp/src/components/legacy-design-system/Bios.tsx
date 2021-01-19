import * as React from 'react'
import Box from './Box'
import Text from './Text'
import lintonProfilePhoto from './assets/linton.jpg'
import beebeeProfilePhoto from './assets/beebee.jpg'
import ProfilePhoto from './ProfilePhoto'

function Bio({ greeting, description, twitterId, email, photo, ...rest }) {
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
        <ProfilePhoto
          size={[150, 200]}
          url={photo}
          mb={4}
          style={{ position: 'relative' }}
        />
        {/* {`https://twitter.com/${twitterId}`} */}
      </Box>
      <Text textVariant="h2">{greeting}</Text>
      <Text textVariant="body" color="secondaryText">
        {description}
      </Text>
    </Box>
  )
}

export default function Bios({ bg = 'secondaryBg' }) {
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
      />
    </Box>
  )
}
