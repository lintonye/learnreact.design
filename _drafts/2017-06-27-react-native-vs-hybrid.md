---
layout: post
last-modified: '2017-06-20'

title: "React Native vs. Hybrids"
subtitle: "React terms in plain English and doodles🌴🎄⚛"

excerpt: "React terms explained in plain English and doodles🌴🎄⚛"

author:
  name: Linton Ye
  twitter: lintonye
  bio: Freelance full-stack developer in BC Canada (GMT-8). Android, React Native, Node.js, MongoDB, PostgreSQL. <a href="mailto:linton@jimulabs.com">Contact me.</a>
  image: linton.jpg
---

_This series of posts will be the very first part of the ["React for Designers" course](http://learnreact.design) I'm creating. Be sure to [sign up](http://learnreact.design) to receive exclusive updates!_

- _[What is React?](TODO)_
- _ReactJS, React.js, React Native, Which Is Which? (this post)_
- _Components, props, state etc. (coming soon)_

---

In the [previous post](TODO), we looked at what React is and what makes it special. Now we are ready to study some other terms in the family: ReactJS, React.js, React Native, React Sketch.app etc.

<a name="learning-goals">

# Learning Goals
- What is a native app? What is a web app? Difference between the two?

# RN
- matrix analogy?
  - virtual world on top of virtual world
  - each virtual world has to obey the basic rules of its base world.
  - closer to the mental, more "native"
  - RN is in parallel with Browser
  - RN allows penetrating to its base layer

- hybrid app: outsource to Studio Web. It has its place especially in early days, but its ux sucks

- why native UI is better on mobile?
  - performance
  - native look and feel
  - The little things – like scrolling acceleration, keyboard behavior, and navigation – all add up and can create frustrating experiences for your customers when they don’t behave as expected.

- learn once, write anywhere vs. write once, run anywhere.

- why web/hybrid UI sucks on mobile?
  - principle
    - the design principle of web: make a page look the same regardless of platforms (perhaps even at the expense of reduced performance). -- this contradicts with the best practices of mobile design. Users want native look and feel. While the web gives enough liberty for a web app to simulate a lot of those, it's against its design goal.
    - the design principle of RN: native look and feel, native performance. This goes hand in hand with mobile design.
  - History
    - in the past, web is only for static pages. Interactivity, dynamic features are added over time. The issue is that this add a lot of baggage over time. You can't suddenly change something -- there are billions of websites depend on that, you'd have to adopt everything the web has, even a lot of bad parts.
    - RN: new platform, no baggage
  - JS
    - JS is slow. TODO the JS slow causes mobile web app slow post.
    - On Web, to simulate native interface, a lot of things have to be done in JS, which is slow.
    - On RN, JS code is like glue that connects native parts together. Native code does the heavylifting.

  <a name="endofpost">
