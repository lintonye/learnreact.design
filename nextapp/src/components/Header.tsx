import { jsx } from '@emotion/core'
import { Menu } from '@headlessui/react'
import { Link } from '@/components/design-system'
import LogoLight from '@/assets/logo-light.svg'

export function Header() {
  return (
    <header>
      <nav>
        <ul className="flex m-4 space-x-8 text-sm">
          <li>
            <Link href="/">
              <div className="p-8 -m-8">
                <img src={LogoLight} width={20} />
              </div>
            </Link>
          </li>
          <li>
            <Link href="/courses">Courses</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
            {/* <Menu>
              <Menu.Button>Posts</Menu.Button>
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
            </Menu> */}
          </li>
          <li>
            <Link href="/tips">Tips</Link>
          </li>
          {/* <li>
            <a href="/hire-me">Hire Linton</a>
          </li> */}
        </ul>
      </nav>
    </header>
  )
}
