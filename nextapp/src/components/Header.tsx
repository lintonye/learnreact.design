import { jsx } from '@emotion/core'
import { Menu } from '@headlessui/react'
import Link from 'next/link'

export function Header() {
  return (
    <header>
      <nav>
        <ul className="flex m-4 space-x-8 text-sm">
          <li>
            <a href="/">LearnReact.design</a>
          </li>
          <li>
            <Link href="/courses">Courses</Link>
          </li>
          <li>
            <Menu>
              <Menu.Button>Tutorials</Menu.Button>
              <Menu.Items>
                <Menu.Item className="">
                  <Link href="/design-react">Design x React</Link>
                </Menu.Item>
                <Menu.Item className="">
                  <Link href="/html-css-js">Fundamentals</Link>
                </Menu.Item>
                <Menu.Item className="">
                  <Link href="/react">React</Link>
                </Menu.Item>
                <Menu.Item className="">
                  <Link href="/framer">Framer</Link>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </li>
          <li>
            <a href="/webinars">Webinars</a>
          </li>
          {/* <li>
            <a href="/hire-me">Hire Linton</a>
          </li> */}
        </ul>
      </nav>
    </header>
  )
}
