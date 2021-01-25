import * as React from 'react'
import { motion } from 'framer-motion'
import * as Svgs from './canvasSvg'

function withFrame(
  Comp: React.FunctionComponent,
  width: number,
  height: number,
) {
  return function (props: any) {
    return (
      <motion.div
        {...props}
        style={{ position: 'absolute', ...props.style, width, height }}
      >
        <Comp />
      </motion.div>
    )
  }
}

export const FgDay = withFrame(Svgs.FgDay, 28, 28)
export const FgNight = withFrame(Svgs.FgNight, 28, 28)
export const TrackDay = withFrame(Svgs.TrackDay, 96, 28)
export const TrackNight = withFrame(Svgs.TrackNight, 96, 28)
export const ShootingStar = withFrame(Svgs.ShootingStar, 28, 28)
export const KnobDay = withFrame(Svgs.KnobDay, 26, 27)
export const KnobNight = withFrame(Svgs.KnobNight, 26, 27)
export const Star = withFrame(Svgs.Star, 28, 28)

// Board button
export const RocketArrow = withFrame(Svgs.RocketArrow, 40, 40)
export const BigFlame = withFrame(Svgs.BigFlame, 8, 11)
export const SmallFlame = withFrame(Svgs.SmallFlame, 6, 19)
