import * as React from 'react'
import { Box, Text, Link } from '.'
import { style } from 'styled-system'
import styled from '@emotion/styled'
import ProfilePhoto from './ProfilePhoto'

const fill = style({ prop: 'fill', key: 'colors' })
const Svg = styled.svg`
  ${fill};
`

function Quote({ color, ...rest }: any) {
  return (
    <Box {...rest}>
      <Svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        width="54"
        height="40"
      >
        <path d="M 16 15 C 22.075 15 27 19.925 27 26 C 27 32.075 22.075 37 16 37 C 12.609 37 9.576 35.465 7.558 33.053 C 6.769 32.272 6.023 31.27 5.5 30 C 3.75 25.75 3.55 21.048 4 19 C 4.45 16.952 5.1 13.9 9.5 9.5 C 13.9 5.1 26 4.226 26 5.5 L 26 6 C 26 6 17.528 7.423 16 8 C 14.472 8.577 12.116 9.461 10 12 C 8.113 14.264 8.298 16.698 10.224 16.637 C 11.902 15.599 13.881 15 16 15 Z" />
        <path d="M 41 15 C 47.075 15 52 19.925 52 26 C 52 32.075 47.075 37 41 37 C 37.609 37 34.576 35.465 32.558 33.053 C 31.769 32.272 31.023 31.27 30.5 30 C 28.75 25.75 28.55 21.048 29 19 C 29.45 16.952 30.1 13.9 34.5 9.5 C 38.9 5.1 51 4.226 51 5.5 L 51 6 C 51 6 42.528 7.423 41 8 C 39.472 8.577 37.116 9.461 35 12 C 33.113 14.264 33.298 16.698 35.224 16.637 C 36.902 15.599 38.881 15 41 15 Z" />
      </Svg>
    </Box>
  )
}

export function Testimonial({
  text,
  name,
  nameLink,
  photoName,
  title,
  company,
  showMore = true,
  ...rest
}: any) {
  const [photoUrl, setPhotoUrl] = React.useState(null)
  React.useEffect(() => {
    import(`./assets/student-profile-photos/${photoName}.jpg`).then((module) =>
      setPhotoUrl(module.default),
    )
  }, [photoName])
  return (
    <Box
      {...rest}
      layout="grid"
      gridTemplateColumns={['auto auto', 'auto auto']}
      mx="auto"
      gridColumnGap={4}
      alignItemsGrid="center"
      px={2}
      width={1}
      maxWidth={800}
    >
      <Box gridColumn={['span 2', '1']}>
        <Quote color="subtleText" ml={-4} mt={3} />
        <Text
          as="div"
          color="primaryText"
          mt={-4}
          ml={2}
          p={0}
          textVariant="conversation"
        >
          {text}
        </Text>
      </Box>
      <ProfilePhoto
        size={[80, 100]}
        url={photoUrl}
        style={{ gridRow: 'span 4' }}
      />
      <Text
        as="div"
        color="secondaryText"
        textAlign="right"
        textVariant="small"
        m={0}
        mt={[2, 2, 0]}
      >
        {nameLink ? <Link to={nameLink}>{name}</Link> : name}
      </Text>

      <Text
        as="div"
        color="secondaryText"
        textAlign="right"
        textVariant="small"
        m={0}
      >
        {[title, company].join(', ')}
      </Text>

      {showMore && (
        <Link
          textAlign="right"
          textVariant="small"
          to="/testimonials"
          className="text-right"
        >
          <span className="mr-2">👉</span> More Testimonials
        </Link>
      )}
    </Box>
  )
}
