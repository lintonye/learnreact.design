import {jsx} from '@emotion/core'
import {Menu} from '@headlessui/react'

export function NavBar() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="">LearnReact.design</a>
          </li>
          <li>
            <a href="/courses">Courses</a>
          </li>
          <li>
            <Menu>
              <Menu.Button>Tutorials</Menu.Button>
              <Menu.Items>
                <Menu.Item className="">
                  <a>Design x React</a>
                </Menu.Item>
                <Menu.Item className="">
                  <a>Fundamentals</a>
                </Menu.Item>
                <Menu.Item className="">
                  <a>React</a>
                </Menu.Item>
                <Menu.Item className="">
                  <a>Framer</a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </li>
          <li>
            <a href="/webinars">Webinars</a>
          </li>
          <li>
            <a href="/hire-me">Hire Linton</a>
          </li>
        </ul>
        <Menu>
          <Menu.Button className="">LearnReact.design</Menu.Button>
          <Menu.Button className="">Courses</Menu.Button>
          <Menu.Items></Menu.Items>
          <Menu.Button className="">Tutorials</Menu.Button>
          <Menu.Button className="">Webinars</Menu.Button>
          <Menu.Button className="">Hire Linton</Menu.Button>
        </Menu>
      </nav>
    </header>
  )
}
