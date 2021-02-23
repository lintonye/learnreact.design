import ReactLottie from 'react-lottie'

export function Lottie({
  data,
  play,
  speed = 1,
  loop = true,
}: {
  data: any
  play: boolean
  speed?: number
  loop: boolean | number
}) {
  const options = {
    loop,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <ReactLottie
      options={options}
      isStopped={!play}
      width={150}
      height={150}
      speed={speed}
    />
  )
}
