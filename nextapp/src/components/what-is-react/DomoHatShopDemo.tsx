import { jsx } from '@emotion/core'
import imgHatCap from './hat-cap.png'
import imgHatHarryPotter from './hat-harry-potter.png'
import imgHatLeprechaun from './hat-leprechaun.png'
import imgHatPirate from './hat-pirate.png'
import imgHatPropeller from './hat-propeller.png'
import imgThinker from './thinker.png'
import Image from 'next/image'
import { FiShoppingCart } from 'react-icons/fi'
import { useState, useContext, useEffect, useRef } from 'react'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { InPostMessageContext } from '@/components/InPostMessageContext'

type Props = {
  id: string
}

function SearchBar() {
  return (
    <form
      id="SearchBar"
      className="space-x-0.5 flex"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <input type="string" className="text-black px-1" />
      <button className="border-white border p-0.5 px-2 rounded-sm">
        Search
      </button>
    </form>
  )
}

function ShoppingCart() {
  return (
    <div className="relative m-1" id="ShoppingCart">
      <FiShoppingCart size={20} />
      <div
        className="absolute -right-2 -top-2 rounded-full w-4 h-4 flex justify-center items-center bg-pink-600"
        css={{ fontSize: '0.5rem' }}
      >
        2
      </div>
    </div>
  )
}

function Header() {
  return (
    <header id="Header">
      <ul className="flex space-x-6 items-center p-3 text-sm bg-indigo-900 text-white">
        <li>Home</li>
        <li>
          <SearchBar />
        </li>
        <li>Account</li>
        {/* <li>Return &amp; Orders</li> */}
        <li className="flex-1 flex justify-end">
          <ShoppingCart />
        </li>
      </ul>
    </header>
  )
}

function Domo() {
  return <Image src={imgThinker} width={220} height={220} />
}

const hats: { [key: string]: string } = {
  Cap: imgHatCap,
  'Harry Potter': imgHatHarryPotter,
  Leprechaun: imgHatLeprechaun,
  Pirate: imgHatPirate,
  Propeller: imgHatPropeller,
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
  return (
    <div className={className}>
      <Image
        src={hats[type]}
        width={small ? 30 : 100}
        height={small ? 30 : 100}
      />
    </div>
  )
}

function DomoWithHat({ hat }: { hat: string }) {
  return (
    <div className="relative flex-shrink-0" id="DomoWithHat">
      <Domo />
      <Hat type={hat} className="absolute -top-3 right-2" />
    </div>
  )
}

function Main() {
  const hatNames = Object.keys(hats)
  const [activeHat, setActiveHat] = useState(hatNames[0])
  return (
    <main className="p-3 flex justify-around" id="Main">
      <DomoWithHat hat={activeHat} />
      <div className="flex flex-col justify-center space-y-3 items-start">
        <h2 className="text-2xl">{activeHat}</h2>
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
        <button className="rounded-sm bg-indigo-500 text-white text-sm py-1 px-2">
          Add To Cart
        </button>
      </div>
    </main>
  )
}

function Footer() {
  return (
    <footer
      className="p-2 text-xs flex justify-center bg-indigo-900 text-white"
      id="Footer"
    >
      <div>© 2021 Domo's Hat Shop</div>
    </footer>
  )
}

function DomoHatShop() {
  return (
    <div className="bg-white top-0 sticky">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

const variants = {
  initial: { opacity: 0 },
  visible: { opacity: 1 },
}

function useHighlightRects(ids: string[]) {
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
  }, [ids])
  return rects
}

function Highlight({ id, delay }: { id: string; delay: number }) {
  const rect = useHighlightRects([id])[0]
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="visible"
      exit="initial"
      transition={{ delay }}
      className="border-2 pl-2 border-yellow-400 h-1/6 absolute text-yellow-300 text-xl font-semibold "
      css={{
        left: rect?.left,
        top: rect?.top,
        width: rect?.width,
        height: rect?.height,
      }}
    >
      <span css={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}>{id}</span>
    </motion.div>
  )
}

function Annotation({ ids = [] }: { ids: string[] }) {
  const rects = useHighlightRects(ids)
  const rectSvgs = rects.map(
    (r) =>
      `<rect x="${r?.x}" y="${r?.y}" width="${r?.width}" height="${r?.height}" />`,
  )

  return (
    <div className="absolute inset-0 pointer-events-none " id="annotation">
      {/* Text annotations */}
      <AnimatePresence>
        {ids.map((h, index) => (
          <Highlight id={h} key={h} delay={index * 0.4} />
        ))}
      </AnimatePresence>
      {/* Backdrop */}
      {ids.length > 0 && (
        <div
          className="absolute inset-0 pointer-events-none bg-black bg-opacity-50 "
          css={{
            // 1. For some reason, only inline svg works as a mask here. Referencing a g or mask with url doesn't work
            // 2. This linear-gradient(#fff,#fff) is particular important to reverse the mask, i.e. carve a hole
            mask: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><g>${rectSvgs.join(
              ' ',
            )}</g></svg>'), linear-gradient(#fff,#fff)`,
            maskComposite: 'exclude', // Firefox
            WebkitMaskComposite: 'xor', // Chrome and Safari
          }}
        />
      )}
    </div>
  )
}

export function DomoHatShopDemo() {
  const [msg] = useContext(InPostMessageContext)
  const highlights = msg === '' ? [] : msg.split(' ')

  return (
    <div className="top-0 sticky shadow-lg rounded-md">
      <DomoHatShop />
      <Annotation ids={highlights} />
    </div>
  )
}
