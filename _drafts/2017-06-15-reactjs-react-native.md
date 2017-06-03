---
layout: post
last-modified: '2017-01-25'

title: "ReactJS, React.js, React Native, Which is Which?"
#subtitle: "A series of posts about creating custom transitions using NavigationExperimental."
#cover_image: "navigation-custom-transition/transit.jpg"

excerpt: "Blog series: creating custom transitions using NavigationExperimental. This post covers key challenges in the implementation."

author:
  name: Linton Ye
  twitter: lintonye
  bio: Freelance full-stack developer in BC Canada (GMT-8). Android, React Native, Node.js, MongoDB, PostgreSQL. <a href="mailto:linton@jimulabs.com">Contact me.</a>
  image: linton.jpg
---
# ReactJS, React Native, ReactXYZ...
Hopefully you've got a hang of what React is, right? But what are those other things, such as ReactJS, React.js, React Native? Let's take a look.

Initially, React was created to build web applications. It's only about portraits from the studio "Web Browser".

As time goes by, people realized that React is actually capable of working with other studios, such as studio "Mobile", studio "Mac" and studio "Sketch".

To make things more efficient, React hires an assistant "ReactDOM" whose only job is to talk to Domo in the studio "Web Browser". React can now focus on receiving sketches from the customers (developers) and making clay models (virtual DOM).

When customers ask for portraits from other studios, React hires more assistants, which are collectively called "Renderers". "ReactDOM" is a Renderer too.

![Perhaps three images: React uses assistants to talk to models in three different studios: Domo, the model in studio "Mobile" and the model in studio "Sketch"](TODO)

This is how React Native was born. The original React for the web (let's call it "React Web") was split into two parts: ReactJS and ReactDOM.

With ReactJS at its core, plus a few new renderers, plus native APIs such as the network, accelerometer and storage, React Native is formed as a complete platform for building native apps. Using the same ideas of reactive UI, virtual DOM and components, we can build native mobile apps, desktop apps or even convert code into images in Sketch.

![React Native = ReactJS + renderers + other stuff](TODO)

React Native includes all you need to build an app, whereas React Web is just a small library focuses specifically on the UI in a web browser. This is the major difference between the two.

Due to historical reasons, many people use ReactJS or React.js to refer to React Web. Interestingly, it seems Facebook has never officially used the name "ReactJS" or "React.js". It [has always been just "React"](https://web.archive.org/web/20130529213355/https://facebook.github.io/react/).

# TODO what React Web is for? What React Native is for?

TODO do we need the section below?
## DOM: A slightly more technical intro
In reality, a developer writes HTML which gets turned into a DOM tree, a hierarchical data structure living in a web browser. What is a hierarchical data structure? You can imagine it as a whole bunch of boxes inside boxes.

![boxes inside boxes](/images/what-is-react/02.1-box-in-box.png)

For convenience, these boxes are represented as a chart as below which looks remotely like a upside-down tree:

![a DOM tree](/images/what-is-react/02.2-dom-tree.png)

The browser then renders a web page using the information in the DOM tree, just as Browsera paints a portrait according to Domo's pose. The developer can write JavaScript code to communicate with and update the DOM tree which, as the result, changes the content of the web page.

![HTML -> DOM -> rendering in browser window, JS change DOM](/images/what-is-react/03-html-dom.png)


  <a name="endofpost">
