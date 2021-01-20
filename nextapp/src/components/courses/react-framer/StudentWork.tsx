import * as React from 'react'
import { Box, Text, Link, Video } from '@/components/legacy-design-system'
export default function StudentWork({
  title,
  poster,
  video,
  author,
  authorLink,
  link,
  hovered,
  onHoverStart,
  onHoverEnd,
  ...props
}: any) {
  const videoTag = (
    <Box
      bg="primaryBg"
      borderRadius="moreRound"
      boxShadow="0 0 2px white"
      border={`1px solid ${hovered ? '#A3A7CD' : '#D3D7FD'}`}
      // boxShadow={hovered ? "hover" : "normal"}
      layout="flex"
      p={2}
      justifyContent="center"
      alignItems="center"
      mb={3}
      // Use fixed width to avoid jumping issue
      width={326}
      height={194}
    >
      <Video
        play={hovered}
        videoUrl={video}
        posterUrl={poster}
        width={300}
        style={{
          borderRadius: 5,
        }}
      />
    </Box>
  )
  return (
    <Box
      layout="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      {...props}
    >
      {link ? (
        <Link to={link} target="_blank">
          {videoTag}
        </Link>
      ) : (
        videoTag
      )}
      <Text textVariant="h4">{title}</Text>
      <Box layout="flex" mb={[6, 0]} color="secondaryText">
        <Text textVariant="body" mr={'4px'}>
          by
        </Text>
        <Text>
          {authorLink ? <Link to={authorLink}>{author}</Link> : author}
        </Text>
      </Box>
    </Box>
  )
}
