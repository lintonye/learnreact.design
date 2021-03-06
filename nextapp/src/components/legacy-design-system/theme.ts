const tinycolor = require('tinycolor2')
const fontSizes = [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72]

type Theme = {
  [name: string]: any
}

export const light: Theme = {
  name: 'light',
  space: [0, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256],
  breakpoints: [40, 52, 64].map((n) => n + 'em'),
  fontSizes,
  colors: {
    primary: [
      '#CFF3FC',
      '#B6ECFB',
      '#9CE7FC',
      '#83E2FC',
      '#60DAFB',
      '#56C4E1',
      '#48A3BB',
      '#306B7B',
      '#FE8D2B',
    ],
    secondary: [
      '#FEFFE5',
      '#FEF8B4',
      '#FDECA1',
      '#FCD383',
      '#FBAC61',
      '#BE6013',
      '#B05D21',
      '#7F310A',
      '#4D1300',
    ],
    footerBg: '#120312',
    primaryText: '#000e1a',
    secondaryText: '#5E5E5E',
    ternaryText: '#BFBFBF',
    subtleText: '#D9D9D9',
    accent: '#FF7744',
    primaryBg: 'white',
    secondaryBg: '#F2F2F2',
    ternaryBg: '#F8F8F8',
    translucentBg: 'rgba(255, 255, 255, 0.95)',
    menuBg: '#fff',
    shadow: 'rgba(0, 0, 0, 0.25)',
    error: 'red',
    success: 'green',
    disabledBg: `white`,
    disabledText: `#BFBFBF`,
    gray: [
      '#F2F2F2',
      '#D9D9D9',
      '#BFBFBF',
      '#A6A6A6',
      '#8C8C8C',
      '#737373',
      '#5E5E5E',
      '#474747',
      '#333',
    ],
    black: '#000e1a',
    white: '#fff',
    green: '#4EA24E',
    red: '#F25F5F',
    transparent: 'transparent',
  },
  shadows: {
    none: 'none',
    normal: '0px 2px 5px 0px rgba(0, 0, 0, 0.25)',
    hover: '0px 2px 15px 0px rgba(0, 0, 0, 0.25)',
    normalColorable: '0px 2px 5px 0px',
    hoverColorable: '0px 2px 15px 0px',
  },
  radii: {
    none: '0',
    mostlySquare: '5px',
    moreRound: '10px',
    mostRound: '100px',
    round: '1000px',
  },
  borders: {
    none: 'none',
    solid: '1px solid',
    dashed: '2px dashed',
    dotted: '2px dotted',
  },
  textVariants: {
    h1: {
      as: 'h1',
      // fontFamily: 'Nunito, sans-serif',
      fontSize: [3, 4, 5],
      lineHeight: 1.2,
      fontWeight: 600,
    },
    h2: {
      as: 'h2',
      // fontFamily: 'Nunito, sans-serif',
      fontSize: [2, 3, 4],
      lineHeight: 2,
      fontWeight: 600,
    },
    h3: {
      as: 'h3',
      // fontFamily: 'Nunito, sans-serif',
      fontSize: [2, 3, 4],
    },
    h4: {
      as: 'h4',
      // fontFamily: 'Nunito, sans-serif',
      fontSize: [1, 2, 3],
      fontWeight: 500,
    },
    body: {
      as: 'div',
      // fontFamily: 'Nunito, sans-serif',
      fontSize: [1, 2],
    },
    small: {
      as: 'div',
      // fontFamily: 'Nunito, sans-serif',
      fontSize: [0, 1],
    },
    smallBold: {
      as: 'div',
      // fontFamily: 'Nunito, sans-serif',
      fontSize: [0, 1],
      fontWeight: 700,
    },
    conversation: {
      as: 'div',
      fontFamily: "'EB Garamond Extra-Bold', serif",
      fontSize: [3, 4],
      fontStyle: 'italic',
      letterSpacing: 0.3,
    },
    bigNumber: {
      as: 'div',
      // fontFamily: 'Nunito, sans-serif',
      fontSize: [5, 6, 8],
      fontWeight: 100,
      //fontStyle: "italic"
    },
    mediumNumber: {
      as: 'div',
      // fontFamily: 'Nunito, sans-serif',
      fontSize: [5, 6],
      fontWeight: 100,
      //fontStyle: "italic"
    },
    heroHeader: {
      as: 'h1',
      // fontFamily: 'Nunito, sans-serif',
      fontSize: [5, 60],
      lineHeight: 1,
      fontWeight: 900,
    },
    heroSubHeader: {
      as: 'h2',
      // fontFamily: 'Nunito, sans-serif',
      fontSize: [3, 27],
      lineHeight: 1,
      fontWeight: 300,
    },
    courseTitleHeader: {
      as: 'h1',
      // fontFamily: 'Nunito, sans-serif',
      fontSize: [4, 5, 6],
      lineHeight: 1.1,
      fontWeight: 700,
    },
  },
  buttons: {
    primary: {
      color: '#fff',
      fontSize: 3,
      padding: '15 30',
      backgroundColor: '#48A3BB',
    },
    outline: {
      color: '#007ce0',
      fontSize: 3,
      padding: '15 30',
      backgroundColor: 'transparent',
      boxShadow: 'inset 0 0 0 2px',
    },
  },
}

export const dark: Theme = {
  ...light,
  name: 'dark',
  colors: {
    ...light.colors,
    primaryText: '#f3f3f3',
    secondaryText: '#b5a0b0',
    ternaryText: '#a5a0a0',
    subtleText: '#554555',
    accent: '#FF7744',
    primaryBg: '#221322',
    secondaryBg: '#322332',
    ternaryBg: '#382938',
    translucentBg: 'rgba(22, 13, 22, 0.85)',
    shadow: 'rgba(255, 255, 255, 0.25)',
    menuBg: '#322332',
    disabledBg: `#221322`,
    disabledText: `#554555`,
  },
}

export const darkGrey: Theme = {
  ...dark,
  name: 'darkGrey',
  colors: {
    ...dark.colors,
    primaryText: '#ddd',
    secondaryText: '#a0a0a0',
    ternaryText: '#a5a0a0',
    subtleText: '#554555',
    accent: '#FF7744',
    primaryBg: '#1d1d1d',
    secondaryBg: '#2e2e2e',
    ternaryBg: '#3e3e3e',
    translucentBg: 'rgba(22, 22, 22, 0.85)',
    shadow: 'rgba(255, 255, 255, 0.25)',
    menuBg: '#111111',
    disabledBg: `#2e2e2e`,
    disabledText: `#554555`,
  },
}

export const spaceLight: Theme = {
  ...light,
  name: 'spaceLight',
  colors: {
    ...light.colors,
    // accent: "#7469a1",
    // secondaryBg: "hsla(0, 0%, 100%, 0.8)",
    // primaryText: "hsl(271, 48%, 20%)",
    // secondaryText: "hsl(271, 20%, 45%)",
    // ternaryText: "#BFBFBF",
    gray: [
      '#F2F2F2',
      'hsla(0, 0%, 100%, 0.8)',
      '#BFBFBF',
      '#A6A6A6',
      '#8C8C8C',
      '#737373',
      '#5E5E5E',
      '#474747',
      '#333',
    ],
  },
}

export const spaceDark: Theme = {
  ...dark,
}

export default light
