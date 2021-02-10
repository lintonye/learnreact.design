import { Lottie } from '../Lottie'
import animationData from './surprise.json'

export function Surprise({ play }: { play: boolean }) {
  return <Lottie data={animationData} play={play} />
}
