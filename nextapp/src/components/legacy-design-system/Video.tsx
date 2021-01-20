import * as React from 'react'

export default function Video({
  play = true,
  videoUrl,
  posterUrl,
  width = undefined,
  height = undefined,
  maxWidth = undefined,
  style,
  ...props
}: any) {
  const videoRef = React.useRef<HTMLVideoElement>()
  React.useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      if (play) videoElement.play()
      else videoElement.pause()
    }
  }, [play, videoRef])
  return (
    <video
      ref={videoRef}
      src={videoUrl}
      autoPlay={false}
      loop
      muted
      playsInline
      poster={posterUrl}
      style={{
        ...style,
        display: 'inline-block',
        width,
        height,
        maxWidth,
      }}
      {...props}
    />
  )
}
