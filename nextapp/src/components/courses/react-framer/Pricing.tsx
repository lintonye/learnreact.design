import * as React from 'react'
import {
  Box,
  Text,
  Button,
  Link,
  Image,
} from '@/components/legacy-design-system'
import pricingColumnBg1 from './assets/pricing-column-bg1.svg'
import pricingColumnBg2 from './assets/pricing-column-bg2.svg'
import pricingColumnBg3 from './assets/pricing-column-bg3.svg'
import planLogoSatellite from './assets/plan-satellite.svg'
import planLogoSpaceShuttle from './assets/plan-space-shuttle.svg'
import planLogoStarship from './assets/plan-starship.svg'
import planTopComet from './assets/plan-top-comet.svg'
import { Waypoint } from 'react-waypoint'
import { animated, useSpring, useTrail } from 'react-spring'
import ConvertKitForm from '@/components/legacy-design-system/ConvertKitForm'
import styled from '@emotion/styled'

const plans = [
  {
    planName: 'SATELLITE',
    logo: planLogoSatellite,
    titles: ['First', '2 Modules'],
    descriptions: ['1.5 Hours of HD videos', '4 exercises'],
    price: 99,
    discountedPrice: 0,
    enrollLink: 'https://school.learnreact.design/purchase?product_id=1218726',
  },
  {
    planName: 'SPACE SHUTTLE',
    logo: planLogoSpaceShuttle,
    titles: ['Foundation', 'Modules'],
    descriptions: ['4 Hours of HD videos', '11 exercises', 'Private Slack'],
    price: 149,
    discountedPrice: 99,
    // comingSoon: true,
    secondaryEnrollLinkLabel: 'Upgrade to Starship for $149',
    secondaryEnrollLink:
      'https://school.learnreact.design/purchase?product_id=1669958',
    enrollLink:
      'https://school.learnreact.design/purchase?product_id=1669954&coupon_code=LAUNCH',
  },
  {
    planName: 'STARSHIP',
    logo: planLogoStarship,
    titles: ['All', '14 Modules'],
    descriptions: ['14 Hours of HD videos', '26 exercises', 'Private Slack'],
    price: 299,
    discountedPrice: 219,
    // comingSoon: true,
    // offerTitle: "Early bird access",
    enrollLink:
      'https://sso.teachable.com/secure/157508/checkout/1669960/prototyping-with-react-framer-starship-bundle?coupon_code=LAUNCH',
    // secondaryEnrollLinkLabel: "or 5 payments of $59/m",
    // secondaryEnrollLink:
    //   "https://school.learnreact.design/purchase?product_id=1669961",
    secondaryEnrollLinkLabel: 'or $29 per month',
    secondaryEnrollLink:
      'https://school.learnreact.design/purchase?product_id=1807559',
  },
  // {
  //   planName: "STARSHIP-PLUS",
  //   logo: planLogoStarship,
  //   titles: ["Starship + ", "Coaching"],
  //   descriptions: ["2 hours of private coaching", "Everything in Starship"],
  //   price: 699,
  //   discountedPrice: 599,
  //   // comingSoon: true,
  //   // offerTitle: "Early bird access",
  //   enrollLink:
  //     "https://sso.teachable.com/secure/157508/checkout/1670034/prototyping-with-react-framer-starship-bundle?coupon_code=LAUNCHCOACHING",
  // },
]

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
    <Box layout="flex">
      <NormalPrice textVariant="h2" crossOut={crossOut}>
        {normal === 0 ? 'FREE' : `$${normal}`}
      </NormalPrice>
      {crossOut && (
        <Text textVariant="h3" ml={2}>
          {discounted === 0 ? 'FREE' : `$${discounted}`}
        </Text>
      )}
    </Box>
  )
}

function PricingColumn({
  planName,
  logo,
  titles,
  descriptions,
  price,
  discountedPrice,
  comingSoon,
  enrollLink,
  secondaryEnrollLink,
  secondaryEnrollLinkLabel,
  index,
  offerTitle,
  ...props
}) {
  const bgs = [pricingColumnBg1, pricingColumnBg2, pricingColumnBg3]
  const buttonColors = ['#74699f', '#530066', '#260166']
  return (
    <Box
      {...props}
      position="relative"
      layout="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      height={[index * 43 + 480]}
      color="white"
    >
      <Box position="absolute" mt={-100} zIndex={-1}>
        <img src={bgs[index]} width="99%" />
      </Box>
      <Box layout="flex" flexDirection="column" alignItems="center">
        <img src={logo} width={40} />
        <Text color="gray.1" mt={2}>
          {planName}
        </Text>
      </Box>
      <Box color="white">
        {titles.map((title, idx) => (
          <Text textAlign="center" textVariant="h3" fontWeight={700} key={idx}>
            {title}
          </Text>
        ))}
      </Box>
      <Box color="gray.1">
        {descriptions.map((description, idx) => (
          <Text key={idx} textAlign="center" textVariant="body">
            {description}
          </Text>
        ))}
      </Box>
      <Box>
        <Box mb={4}>
          {comingSoon ? (
            <Text textVariant="h3">Coming soon</Text>
          ) : (
            <Prices normal={price} discounted={discountedPrice} />
          )}
        </Box>
        {secondaryEnrollLink && (
          <Link to={secondaryEnrollLink}>
            <Text textVariant="small" mb={3} mt={-5} color="#FFF">
              {secondaryEnrollLinkLabel}
            </Text>
          </Link>
        )}
        {enrollLink ? (
          <>
            <Link to={enrollLink} underline={false}>
              <Button
                primary
                variant="small"
                color={buttonColors[index]}
                disabled={comingSoon}
              >
                ENROLL NOW
              </Button>
            </Link>
          </>
        ) : (
          <Button
            primary
            color={buttonColors[index]}
            variant="small"
            disabled={comingSoon}
          >
            ENROLL NOW
          </Button>
        )}
        <Text
          textVariant="small"
          mt={1}
          color="secondaryText"
          textAlign="center"
        >
          {!comingSoon ? offerTitle || 'Limited-time offer' : ' '}
        </Text>
      </Box>
    </Box>
  )
}

const AnimatedImage = animated(Image)
const AnimatedPricingColumn = animated(PricingColumn)

export default function Pricing(props) {
  const [showPricing, setShowPricing] = React.useState(false)
  const cometStyle = useSpring({
    transform: `translate(${showPricing ? 0 : -1400}px, ${
      showPricing ? 0 : 180
    }px) rotate(-0.7deg)`,
  })
  const plansTrail = useTrail(plans.length, {
    opacity: showPricing ? 1 : 0,
    transform: `translateY(${showPricing ? 0 : 100}px)`,
    delay: 400,
  })
  return (
    <Waypoint
      onEnter={() => {
        setShowPricing(true)
      }}
    >
      <div>
        <Box id="pricing" pt={10}>
          <Box
            layout="grid"
            gridTemplateColumns={['1fr', 'repeat(3, 1fr)']}
            gridRowGap={9}
            alignItemsGrid="end"
            maxWidth={800}
            mx="auto"
            mb={9}
            position="relative"
          >
            <AnimatedImage
              src={planTopComet}
              width={[0, 819]}
              height={[0, 604]}
              position="absolute"
              zIndex={-1}
              top={-260}
              left={-20}
              style={cometStyle}
            />
            {plansTrail.map((styleProps, idx) => (
              <AnimatedPricingColumn
                {...plans[idx]}
                key={idx}
                index={idx}
                style={styleProps}
              />
            ))}
          </Box>
          <Box
            maxWidth={600}
            layout="flex"
            flexDirection="column"
            alignItems="center"
            px={4}
            mx="auto"
            // mb={[6, 8]}
          >
            {/* <Link
              to="https://school.learnreact.design/purchase?product_id=1218726"
              underline={false}
            >
              <Button primary color={"#530066"} variant="small">
                ✨ TRY FIRST 2 MODULES FOR FREE ✨
              </Button>
            </Link> */}
            <Text color="primaryText" textVariant="body" mt={0}>
              Interested in a condensed workshop for your team?{' '}
              <Link to="mailto:linton@jimulabs.com">Email me</Link>.
            </Text>
            {/* <Text color="primaryText" textVariant="h3" mb={4} mt={-4}>
              Try the first module for free
            </Text>
            <ConvertKitForm
              formId="465352"
              subscribeButtonTitle="Get Free Videos"
            /> */}
            <Text as="h3" color="primaryText" textVariant="h3" mt={8}>
              100% RISK-FREE INVESTMENT
            </Text>
            <Text as="div" color="primaryText" textVariant="body">
              If you are not completely satisfied with the course, you can get
              100% refund within 30 days of your purchase. No hard feelings!
            </Text>
          </Box>
        </Box>
      </div>
    </Waypoint>
  )
}
