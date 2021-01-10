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
      <ul className="flex justify-between items-center p-3 text-sm bg-indigo-900 text-white">
        <li>Home</li>
        <li>
          <SearchBar />
        </li>
        <li>Account</li>
        <li>Return &amp; Orders</li>
        <li>
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
    <div className="relative flex-shrink-0">
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

function Highlight({ id, delay }: { id: string; delay: number }) {
  const [rec, setRec] = useState<DOMRect | undefined>(undefined)
  useEffect(() => {
    const element = document.getElementById(id)
    const rec = element?.getBoundingClientRect()
    const container = document.getElementById('annotation')
    const parentBox = container?.getBoundingClientRect()

    rec &&
      parentBox &&
      setRec(
        DOMRectReadOnly.fromRect({
          x: rec.left - parentBox.left,
          y: rec.top - parentBox.top,
          width: rec.width,
          height: rec.height,
        }),
      )
  }, [id])

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="visible"
      exit="initial"
      transition={{ delay }}
      className="bg-black bg-opacity-50 border-2 pl-2 border-yellow-400 h-1/6 absolute text-yellow-300 text-xl font-semibold "
      css={{
        left: rec?.left,
        top: rec?.top,
        width: rec?.width,
        height: rec?.height,
      }}
    >
      {id}
    </motion.div>
  )
}

function Annotation({ highlights = [] }: { highlights: string[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none" id="annotation">
      <AnimatePresence>
        {highlights.map((h, index) => (
          <Highlight id={h} key={h} delay={index * 0.4} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export function DomoHatShopDemo({ id }: Props) {
  const [msg] = useContext(InPostMessageContext)
  const highlights = msg === '' ? [] : msg.split(' ')

  return (
    <div className="top-0 sticky shadow-lg rounded-md" id={id}>
      <DomoHatShop />
      <Annotation highlights={highlights} />
    </div>
  )
}