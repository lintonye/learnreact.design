import * as React from 'react'
import { Box } from '@/components/legacy-design-system'
import starsPng from './assets/stars.png'

function ShootingStar({ id, x, begin }) {
  return (
    <use xlinkHref="#shootingStar" opacity="0">
      <animateTransform
        id={`initialDelay${id}`}
        dur={begin}
        type="translate"
        attributeType="XML"
        attributeName="transform"
      />
      <animateTransform
        begin={`animX${id}.end`}
        id={`pause${id}`}
        dur="6s"
        type="translate"
        attributeType="XML"
        attributeName="transform"
      />
      <animate
        id={`animX${id}`}
        begin={`initialDelay${id}.end; pause${id}.end`}
        attributeName="x"
        from={x}
        to={500 + x}
        dur="2s"
      />
      <animate
        begin={`initialDelay${id}.end; pause${id}.end`}
        attributeName="y"
        from="0"
        to="500"
        dur="2s"
      />
      <animate
        begin={`initialDelay${id}.end; pause${id}.end`}
        attributeName="opacity"
        // from="1"
        // to="0"
        dur="2s"
        values="0; 1; 0"
      />
      <animate
        begin={`initialDelay${id}.end; pause${id}.end`}
        attributeName="scale"
        from="0.6"
        to="0"
        dur="2s"
      />
    </use>
  )
}

function Galaxy({
  width,
  height,
  clipPath,
  name,
  imageOffset = { x: 0, y: 0 },
}) {
  const shootingStars = Array(3)
    .fill(0)
    .map((_, id) => {
      return (
        <ShootingStar
          id={'st' + id}
          key={id}
          x={Math.floor((Math.random() * width) / 4)}
          begin={Math.random() * 10}
        />
      )
    })
  const clipPathDef = <clipPath id={`outline-${name}`}>{clipPath}</clipPath>
  return (
    <>
      {/* Static layer */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={{ position: 'absolute', zIndex: -1 }}
      >
        <g
          clipPath={`url(#outline-${name})`}
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <rect width="100%" height="100%" fill="url(#paint0_linear)" />
          {/* Width and height are required to show images in FF and Safari */}
          <image
            xlinkHref={starsPng}
            width="1949"
            height="531"
            x={imageOffset.x}
            y={imageOffset.y}
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="847.207"
            y1="8.9924"
            x2="389.903"
            y2="598.379"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#030A32" />
            <stop offset="1" stopColor="#50245B" />
          </linearGradient>
          <path
            id="star"
            d="M 2.148 0 L 2.686 3.229 L 4.297 4.305 L 2.686 5.381 L 2.148 8.609 L 1.611 5.381 L 0 4.305 L 1.611 3.229 Z"
          />
          <circle id="starCircle" r="1" />
          {clipPathDef}
        </defs>
      </svg>
      {/* Animated layer */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        // transform: translateZ(0) hoping to offload to GPU: https://fjorgedigital.com/insights/blog/can-svg-animations-use-less-cpu/
        style={{ position: 'absolute', zIndex: -1, transform: 'translateZ(0)' }}
      >
        <g
          clipPath={`url(#outline-${name})`}
          fillRule="evenodd"
          clipRule="evenodd"
        >
          {shootingStars}
        </g>
        <defs>
          {clipPathDef}
          <g id="shootingStar">
            <path
              d="M 19 18 C 17.895 18 17 18.895 17 20 C 17 21.105 17.895 22 19 22 C 20.105 22 21 21.105 21 20 C 21 18.895 20.105 18 19 18 Z"
              fill="#fff"
            />
            <path d="M 0 0 L 17 20 L 19 18 Z" fill="#FFFFFF" />
          </g>
        </defs>
      </svg>
    </>
  )
}

const galaxies = {
  hero: {
    clipPath: (
      <path d="M12.2667 0C-8.6236 70.4856 -2.52383 148.958 28.2141 211.897C49.7358 255.966 92.0762 280.032 139.831 307.175C185.27 333.002 235.611 361.615 277.584 412.897C348.5 484.719 369 495.054 421.584 514.897C565.769 569.307 758.273 469.85 935.905 378.077C1065.55 311.098 1187.27 248.212 1276.5 252.22C1542.5 264.168 1758.45 123.719 1931.38 11.2534C1937.2 7.46826 1942.97 3.71484 1948.69 0L12.2667 0Z" />
    ),
    width: 1949,
    height: 531,
    clientAreaPadding: [
      '20px 10px 10px 20px',
      '20px 10px 10px 20px',
      '80px 10px 10px 320px',
    ],
  },
  small1: {
    clipPath: (
      <path d="M300 71.2174C300 105.939 220.437 120 137.594 120C54.7513 120 0 105.939 0 71.2174C0 36.4955 15.2776 0 98.1203 0C180.963 0 300 36.4955 300 71.2174Z" />
    ),
    width: 300,
    height: 120,
    imageOffset: { x: -100, y: -10 },
    clientAreaPadding: '50px 10px 30px 10px',
  },
  small2: {
    clipPath: (
      <path d="M 143.316 1.915 C 262.762 10.015 298.68 12.512 285.223 58.996 C 271.767 105.48 229.208 109.431 143.316 116.077 C 57.423 122.724 -5.476 101.646 1.408 58.996 C 8.293 16.346 23.869 -6.186 143.316 1.915 Z" />
    ),
    width: 288,
    height: 118,
    imageOffset: { x: -100, y: -10 },
    clientAreaPadding: ['60px 10px 30px 20px', '50px 10px 30px 100px'],
  },
  subPageHero: {
    clipPath: (
      <path
        d="M967.203 277.021C808.331 265.919 767.831 238.025 450.312 228.46C135.996 217.857 -21.4029 186.201 2.34112 98.2293C19.8168 33.4818 174.638 1.16723 467.542 6.99421C865.384 14.9088 1215.8 -12.1357 1452.1 6.99421C2117.41 74.9701 2033.1 272.606 1452.1 258.626C1294.69 254.839 1156.73 290.264 967.203 277.021Z"
        fill="url(#paint0_linear)"
      />
    ),
    width: 1920,
    height: 280,
    clientAreaPadding: [
      '70px 10px 0px 120px',
      '70px 10px 10px 220px',
      '90px 10px 10px 320px',
    ],
  },
  mobileHero: {
    clipPath: (
      <path
        d="M392.951 377C328.405 361.911 311.951 324 182.951 311C55.2518 296.589 -8.69547 253.565 0.951141 134C8.05106 46 70.9512 2.08037 189.951 9.99997C351.584 20.7569 493.951 -16 589.951 9.99997C860.251 102.388 826 371 589.951 352C526 346.853 469.951 395 392.951 377Z"
        transform="translate(-200)"
      />
    ),
    width: 780,
    height: 390,
    clientAreaPadding: ['30px 10px 10px 20px'],
  },

  mobileSmall1: {
    clipPath: (
      <path d="M211 55.1935C211 82.103 155.04 93 96.7744 93C38.5084 93 0 82.103 0 55.1935C0 28.284 10.7452 0 69.0113 0C127.277 0 211 28.284 211 55.1935Z" />
    ),
    width: 211,
    height: 93,
    imageOffset: { x: -100, y: -10 },
    clientAreaPadding: '40px 10px 30px 10px',
  },
  mobileSmall2: {
    clipPath: (
      <path d="M101.235 1.17164C186.137 6.98703 211.667 8.77974 202.102 42.1529C192.538 75.526 162.287 78.3626 101.235 83.1341C40.1817 87.9063 -4.52704 72.7734 0.366121 42.1529C5.25999 11.5324 16.3314 -4.64446 101.235 1.17164Z" />
    ),
    width: 204,
    height: 84,
    imageOffset: { x: -100, y: -10 },
    clientAreaPadding: '40px 10px 30px 60px',
  },
}

function getResponsiveValue(value) {
  const breakpoints = [500, 800]
  if (Array.isArray(value)) {
    if (typeof window !== 'undefined') {
      for (let i = 0; i < breakpoints.length; i++) {
        if (window.matchMedia(`(max-width: ${breakpoints[i]}px)`).matches) {
          return value[Math.min(i, value.length - 1)]
        }
      }
      return value[value.length - 1]
    } else {
      return value[value.length - 1]
    }
  } else {
    return value
  }
}

export default function GalaxyHole({ galaxy, children, ...props }) {
  const g = getResponsiveValue(galaxy)
  return (
    <Box {...props} position="relative">
      <Galaxy {...galaxies[g]} name={galaxy} />
      <Box p={galaxies[g].clientAreaPadding}>{children}</Box>
    </Box>
  )
}
