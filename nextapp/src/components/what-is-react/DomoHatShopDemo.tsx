import { jsx } from '@emotion/core'

type Props = {
  id: string
}

export function DomoHatShopDemo({ id }: Props) {
  return <div className="h-80 bg-red-300 top-0 sticky" id={id} />
}
