import * as React from 'react'
import { Box, Text, Link } from '.'
import Button from './Button'
import styled from 'styled-components'

const NormalPrice = styled(Text)`
  position: relative;
  :after {
    content: '';
    /* required property */
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: ${(props) => props.crossOut && '4px solid red'};
    height: 45%;
    /* adjust as necessary, depending on line thickness */
    /* or use calc() if you don't need to support IE8: */
    height: calc(50% - 0px);
    /* 1px = half the line thickness */
    width: 100%;
    transform: rotateZ(-4deg);
  }
`

function Prices({ normal, discounted }) {
  const crossOut = normal > discounted
  return (
    <Box layout="flex" color="primaryText">
      <NormalPrice textVariant="h2" crossOut={crossOut}>
        ${normal}
      </NormalPrice>
      {crossOut && (
        <Text textVariant="h3" ml={2}>
          ${discounted}
        </Text>
      )}
    </Box>
  )
}

export function PricingCard({
  title,
  description,
  price,
  discountedPrice,
  enrollLink,
  highlight,
  comingSoon = false,
  ...rest
}) {
  return (
    <Box
      {...rest}
      color="shadow"
      boxShadow={highlight ? 'hoverColorable' : 'normalColorable'}
      bg={highlight ? 'primaryBg' : 'ternaryBg'}
      p={[4, 6]}
      layout="grid"
      gridGap={4}
      justifyContent="center"
      gridAlignItems="center"
      justifyItems="center"
    >
      <Text textVariant="h2" color="primaryText">
        {title}
      </Text>
      <Text textVariant="body" color="secondaryText">
        {description}
      </Text>
      {comingSoon ? (
        <Text textVariant="h4" color="primaryText">
          Coming soon!
        </Text>
      ) : (
        <Prices normal={price} discounted={discountedPrice} />
      )}
      <Link to={enrollLink} underline={false}>
        <Button variant="small" primary={highlight} disabled={comingSoon}>
          Enroll Now
        </Button>
      </Link>
    </Box>
  )
}
