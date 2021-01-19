import * as React from 'react'
import { Box as _Box, Flex as _Flex } from 'rebass'
import styled from 'styled-components'
import {
  border,
  background,
  layout,
  position,
  flexbox,
  grid,
  boxShadow,
  justifyItems,
  alignItems,
  compose,
} from 'styled-system'

const common = compose(
  boxShadow,
  border,
  background,
  layout,
  position,
  grid,
  flexbox,
)

const BoxBase = styled(_Box)(common)

const Flex = styled(_Flex)(boxShadow, common)

const Grid = styled(_Box)(justifyItems, grid, boxShadow, alignItems, common)

function Box(props: any) {
  const { layout = 'box', alignItemsGrid, ...rest } = props
  return (
    <>
      {['frame', 'box'].indexOf(layout) >= 0 && <BoxBase {...rest} />}
      {layout === 'flex' && <Flex {...rest} />}
      {layout === 'grid' && (
        <Grid {...rest} alignItems={alignItemsGrid} display="grid" />
      )}
    </>
  )
}

export default Box
