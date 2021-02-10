import ReactLottie from 'react-lottie'

export function Lottie({ data, play }: { data: any; play: boolean }) {
  const options = {
    loop: 2,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <ReactLottie options={options} isStopped={!play} width={150} height={150} />
  )
}
