import { jsx } from '@emotion/react'
import React, { RefObject } from 'react'
import imgHatCap from './hat-cap.png'
import imgHatHarryPotter from './hat-harry-potter.png'
import imgHatLeprechaun from './hat-leprechaun.png'
import imgHatPirate from './hat-pirate.png'
import imgHatPropeller from './hat-propeller.png'
import imgThinker from './thinker.png'

import imgXmas from './hat_xmas.png'
import imgWool from './hat_wool.png'
import imgPolice from './hat_police.png'
import imgPirate from './hat_pirate.png'
import imgFlower from './hat_ladyFlower.png'
import imgHarry from './hat_Harry.png'
import imgElegant from './hat_elegant.png'
import imgChef from './hat_chef.png'
import imgCap from './hat_cap.png'
import imgBall from './hat_ball.png'

import Image from 'next/image'
import { FiShoppingCart } from 'react-icons/fi'
import { useState, useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { InPostStateContext as InPostStateContext } from '@/components/InPostStateContext'
import { JsxNode, JsxParentNode } from '@/types'

type Props = {
  id: string
}

function SearchBar() {
  const [state] = useContext(InPostStateContext)
  const code = state?.updateSearchBar

  return (
    <form
      id="SearchBar"
      className="space-x-0.5 flex"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      {populate(
        code,
        'form',
        <>
          <input type="string" className="text-black px-1" />
          <button
            className="border-white border p-0.5 px-2 rounded-sm"
            onClick={() => alert("Hang on, I'll search it for you!")}
          >
            Search
          </button>
        </>,
      )}
    </form>
  )
}

function ShoppingCart({ count = 0 }: { count?: number }) {
  return (
    <div className="relative m-1" id="ShoppingCart">
      <FiShoppingCart size={20} />
      <div
        className="absolute -right-2 -top-2 rounded-full w-4 h-4 flex justify-center items-center bg-pink-600"
        css={{ fontSize: '0.5rem' }}
      >
        <AnimatePresence>
          <motion.div
            className="absolute"
            key={count}
            initial={{ y: -10, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
          >
            {count}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Header({ countInCart }: { countInCart: number }) {
  return (
    <div id="Header">
      <ul className="flex space-x-6 items-center p-3 text-sm bg-gray-900 text-white">
        <li>Home</li>
        <li>
          <SearchBar />
        </li>
        <li>Account</li>
        {/* <li>Return &amp; Orders</li> */}
        <li className="flex-1 flex justify-end">
          <ShoppingCart count={countInCart} />
        </li>
      </ul>
    </div>
  )
}

function Domo() {
  return <Image src={imgThinker} width={220} height={220} />
}

const hats: { [key: string]: string } = {
  // Cap: imgHatCap,
  // 'Harry Potter': imgHatHarryPotter,
  // Leprechaun: imgHatLeprechaun,
  // Pirate: imgHatPirate,
  // Propeller: imgHatPropeller,
  Cap: imgCap,
  Christmas: imgXmas,
  Wool: imgWool,
  Police: imgPolice,
  Pirate: imgPirate,
  Flower: imgFlower,
  'Harry Potter': imgHarry,
  Elegant: imgElegant,
  Chef: imgChef,
  Toque: imgBall,
}

function Hat({
  type,
  className,
  small,
}: {
  type: string
  className?: string
  small?: boolean
}) {
  const ratio = 396 / 865
  const smallWidth = 80
  const largeWidth = 200
  return (
    <div className={className}>
      <Image
        className="rotate-12 transform"
        src={hats[type]}
        width={small ? smallWidth : largeWidth}
        height={small ? smallWidth * ratio : largeWidth * ratio}
        layout="fixed"
      />
    </div>
  )
}

function DomoWithHat({ hat }: { hat: string }) {
  return (
    <div className="relative flex-shrink-0" id="DomoWithHat">
      <Domo />
      <Hat type={hat} className="absolute left-12 -top-1" />
    </div>
  )
}

function Main({ onAddToCart }: { onAddToCart: () => void }) {
  const hatNames = Object.keys(hats)
  const [activeHat, setActiveHat] = useState(hatNames[0])
  return (
    <div className="p-3 flex justify-around" id="Main">
      <DomoWithHat hat={activeHat} />
      <div className="flex flex-col justify-center space-y-3 items-start">
        <div className="text-2xl">{activeHat}</div>
        <div>$50</div>
        <div className="grid gap-1 grid-cols-5">
          {hatNames.map((hat) => (
            <div
              key={hat}
              className={`border border-indigo-200 rounded-sm flex justify-center items-center cursor-pointer  hover:border-purple-500 ${
                hat === activeHat && 'border-2 border-purple-700'
              }`}
              onClick={() => setActiveHat(hat)}
            >
              <Hat type={hat} small />
            </div>
          ))}
        </div>
        <p className="text-sm">
          A covering for the head usually having a shaped crown and brim.
        </p>
        <button
          className="rounded-sm bg-pink-600 text-white text-sm py-1 px-2"
          onClick={onAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  )
}

function getType(type: string) {
  switch (type) {
    case 'SearchBar':
      return SearchBar
      break
    case 'ShoppingCart':
      return ShoppingCart
      break
  }
  return type
}

function createElement(node: JsxNode) {
  if (typeof node === 'string') return node
  const children: React.ReactNode[] = Array.isArray(node.children)
    ? node.children.map(createElement)
    : []
  const attrs =
    node.type === 'button'
      ? { className: 'border-white border p-0.5 px-2 rounded-sm' }
      : {}
  return React.createElement(
    getType(node.type),
    // Weird: need "count" here to pass TypeScript check
    { count: 1, ...node.attrs, ...attrs },
    ...children,
  )
}

function populate(
  code: JsxNode | undefined,
  rootType: string,
  fallback: React.ReactElement,
) {
  if (code) {
    if (typeof code === 'string') return code
    if (code.type === rootType && Array.isArray(code.children))
      return code.children.map(createElement)
  }
  return fallback
}

function Footer() {
  const [state] = useContext(InPostStateContext)
  const code = state?.updateFooter

  return (
    <div
      className="p-2 text-xs flex justify-around items-center bg-gray-900 text-white"
      id="Footer"
    >
      {populate(code, 'footer', <div>© 2021 Domo's Hat Shop</div>)}
    </div>
  )
}

function DomoHatShop() {
  const [countInCart, setCountInCart] = useState(2)
  return (
    <div className="bg-white top-0 sticky">
      <Header countInCart={countInCart} />
      <Main onAddToCart={() => setCountInCart((c) => c + 1)} />
      <Footer />
    </div>
  )
}

const variants = {
  initial: { opacity: 0 },
  visible: { opacity: 1 },
}

function useComponentRects(ids: string[]) {
  const [rects, setRects] = useState<(DOMRect | undefined)[]>([])
  useEffect(() => {
    function computeRect(id: string) {
      const element = document.getElementById(id)
      const box = element?.getBoundingClientRect()
      const container = document.getElementById('annotation')
      const parentBox = container?.getBoundingClientRect()

      return (
        box &&
        parentBox &&
        DOMRectReadOnly.fromRect({
          x: box.left - parentBox.left,
          y: box.top - parentBox.top,
          width: box.width,
          height: box.height,
        })
      )
    }
    setRects(ids.map(computeRect))
  }, [ids.join(' ')])
  return rects
}

function relativeTo(rect: DOMRect, parentRect: DOMRect) {
  return DOMRectReadOnly.fromRect({
    x: rect.x - parentRect.x,
    y: rect.y - parentRect.y,
    width: rect.width,
    height: rect.height,
  })
}

function useAdjustedLabelXY(
  componentRect?: DOMRect,
): [{ x: number; y: number }, RefObject<HTMLElement>] {
  const ref = useRef<HTMLElement>(null)
  const [xy, setXy] = useState({ x: 4, y: 4 })

  useLayoutEffect(() => {
    if (ref.current && componentRect) {
      const labelViewportRect = ref.current.getBoundingClientRect()
      const container = document.getElementById('annotation')
      const parentViewportRect = container?.getBoundingClientRect()
      if (labelViewportRect && parentViewportRect) {
        const labelRect = relativeTo(labelViewportRect, parentViewportRect)
        setXy({
          x:
            labelRect.right > componentRect.right
              ? -labelRect.width + componentRect.width
              : 4,
          y:
            labelRect.bottom - componentRect.bottom > 5
              ? componentRect.height
              : 4,
        })
      }
    }
  }, [componentRect, ref])
  return [xy, ref]
}

function ComponentLabel({ id, delay }: { id: string; delay: number }) {
  const rect = useComponentRects([id])[0]
  const [labelXY, labelRef] = useAdjustedLabelXY(rect)
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="visible"
      exit="initial"
      transition={{ delay }}
      className="border-2 pl-2 border-yellow-300 h-1/6 absolute text-yellow-300 text-xl font-semibold "
      css={{
        left: rect?.left,
        top: rect?.top,
        width: rect?.width,
        height: rect?.height,
      }}
    >
      <span
        ref={labelRef}
        className="absolute"
        css={{
          textShadow:
            '-1px -1px 0 #666,1px -1px 0 #666, -1px 1px 0 #666, 1px 1px 0 #666',
          left: labelXY.x,
          top: labelXY.y,
        }}
      >
        {id}
      </span>
    </motion.div>
  )
}

function ComponentHighlighter({
  ids = [],
  labelsOnly = false,
}: {
  ids: string[]
  labelsOnly: boolean
}) {
  const rects = useComponentRects(ids)
  const rectSvgs = rects.map(
    (r) =>
      `<rect x="${r?.x}" y="${r?.y}" width="${r?.width}" height="${r?.height}" />`,
  )

  return (
    <div className="absolute inset-0 pointer-events-none " id="annotation">
      {/* Backdrop */}
      <AnimatePresence>
        {ids.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none bg-black bg-opacity-50 "
            css={
              !labelsOnly && {
                // 1. For some reason, only inline svg works as a mask here. Referencing a g or mask with url doesn't work
                // 2. This linear-gradient(#fff,#fff) is particular important to reverse the mask, i.e. carve a hole
                mask: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><g>${rectSvgs.join(
                  ' ',
                )}</g></svg>'), linear-gradient(#fff,#fff)`,
                maskComposite: 'exclude', // Firefox
                WebkitMaskComposite: 'xor', // Chrome and Safari
              }
            }
          />
        )}
      </AnimatePresence>
      {/* Text annotations */}
      <AnimatePresence>
        {ids.map((h, index) => (
          <ComponentLabel id={h} key={h} delay={index * 0.3} />
        ))}
      </AnimatePresence>
    </div>
  )
}

const mockFooterCode: JsxNode = {
  type: 'footer',
  children: [
    {
      type: 'SearchBar',
    },
    {
      type: 'div',
      children: ['@ Domo!'],
    },
  ],
}

export function DomoHatShopDemo({ className }: { className?: string }) {
  const [state] = useContext(InPostStateContext)
  const highlightOptions = (state?.highlights || '').split(':')
  const ids = highlightOptions[0] === '' ? [] : highlightOptions[0].split(' ')
  const labelsOnly = highlightOptions[1] === 'labels-only'
  // console.log({ state })

  return (
    <div
      className={'shadow-lg rounded-sm overflow-hidden ' + className}
      // css={{ maxWidth: 540 }}
    >
      <DomoHatShop />
      <ComponentHighlighter ids={ids} labelsOnly={labelsOnly} />
    </div>
  )
}
