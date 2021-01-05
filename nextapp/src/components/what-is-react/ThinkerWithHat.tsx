import { jsx } from '@emotion/core'
import imgThinkerWithHat from './thinker-with-hat.png'
import Image from 'next/image'

const Hat = ({ type }) => {
  let url = ''
  switch (type) {
    case 'cap':
      url = `https://cdn.glitch.com/1fb3273a-81cb-45bc-acbd-555546cb098f%2Fcap.png?1518712935783`
      break
    case 'pirate':
      url = `https://cdn.glitch.com/1fb3273a-81cb-45bc-acbd-555546cb098f%2Fpirate.png?1518712936051`
      break
    case 'harry-potter':
      url = `https://cdn.glitch.com/1fb3273a-81cb-45bc-acbd-555546cb098f%2Fharry-potter.png?1518712935951`
      break
    case 'propeller':
      url = `https://cdn.glitch.com/1fb3273a-81cb-45bc-acbd-555546cb098f%2Fpropeller.png?1518712935957`
      break
    case 'leprecon':
      url = `https://cdn.glitch.com/1fb3273a-81cb-45bc-acbd-555546cb098f%2Fleprecon.png?1518712935850`
      break
  }
  return <img src={url} className="hat" />
}

export function ThinkerWithHat() {
  return (
    <div>
      <Hat />
      <Image src={imgThinkerWithHat} width={972} height={565} />
    </div>
  )
}
