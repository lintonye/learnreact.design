import * as React from 'react'

export function Video({
  play = true,
  videoUrl,
  posterUrl,
  ...props
}: {
  play: boolean
  videoUrl: string
  posterUrl: string
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
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
      {...props}
    />
  )
}
