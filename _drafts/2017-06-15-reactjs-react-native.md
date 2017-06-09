---
layout: post
last-modified: '2017-06-15'

title: "ReactJS, React.js, React Native, Which is Which?"
subtitle: "React terms in plain English and doodles"

excerpt: "React terms explained in plain English and doodles🌴🎄."

author:
  name: Linton Ye
  twitter: lintonye
  bio: Freelance full-stack developer in BC Canada (GMT-8). Android, React Native, Node.js, MongoDB, PostgreSQL. <a href="mailto:linton@jimulabs.com">Contact me.</a>
  image: linton.jpg
---

_This series of posts will be the very first part of the ["React for Designers" course](http://learnreact.design) I'm creating. Be sure to [sign up](http://learnreact.design) to receive exclusive updates!_

- _[What is React?](TODO)_
- _React, ReactJS, React.js, React Native, Which is Which? (this post)_
- _Components, props, state etc. (coming soon)_

---

In the [last post](TODO), we've covered the three core ideas of React: reactive UI, virtual DOM and components.

Hopefully you've got a hang of what React is, right? But what are those other things, such as ReactJS, React.js, React Native? Let's take a look.


# Learning Goals
- What is a native app? What is a web app? Difference between the two?
- What is an app built by PhoneGap?
- What RW and RN can be used for? What we can't use RW/RN to build?

# Native app vs. Web app
- difference:
  - installation
  - internet

 - native app: found on app stores. Android has a way to make the installation faster, but genererally from app stores.
 - Web app: no installation


- Android instant app: https://developer.android.com/topic/instant-apps/index.html
- progressive web app:
  - http://blog.ionic.io/what-is-a-progressive-web-app/
  - https://developers.google.com/web/progressive-web-apps/

# ReactJS, React Native, ReactXYZ...
Initially, React was created to build web interfaces. It's only about portraits from the studio "Web Browser".

As time goes by, people realized that React was actually capable of working with other studios, such as studio "Mobile", studio "Mac" and studio "Sketch".

To make things more efficient, React hired an assistant "ReactDOM" whose only job is to talk to Domo in the studio "Web Browser". React can now focus on taking orders from the director (developer) and drawing sketches (virtual DOM).

When customers ask for portraits from other studios, React hires more assistants, whose official job title is  "Renderer". "ReactDOM" is a Renderer too.

![Perhaps three images: React uses assistants to talk to models in three different studios: Domo, the model in studio "Mobile" and the model in studio "Sketch"](TODO)

This is how React Native was born. The original React for the web (let's call it "React Web") was split into two parts: ReactJS and ReactDOM.

With ReactJS at its core, plus a few new renderers, plus native APIs such as the network, accelerometer and storage, React Native is formed as a complete platform for building native apps. Using the same ideas of reactive UI, virtual DOM and components, we can build native mobile apps, desktop apps or even convert code into images in Sketch.

![React Native = ReactJS + renderers + other stuff](TODO)

React Native includes all you need to build an app, whereas React Web is just a small library focuses specifically on the UI in a web browser. This is the major difference between the two.

Due to historical reasons, many people use ReactJS or React.js to refer to React Web. Interestingly, it seems Facebook has never officially used the name "ReactJS" or "React.js". It [has always been just "React"](https://web.archive.org/web/20130529213355/https://facebook.github.io/react/).

npm:
 - https://www.npmjs.com/package/react
 - don't be confused: https://www.npmjs.com/package/reactjs

# TODO what React Web is for? What React Native is for?

TODO do we need the section below?

  <a name="endofpost">
