---
layout: post
last-modified: '2017-06-20'

title: "ReactJS, React.js, React Native, Which Is Which?"
subtitle: "React terms in plain English and doodles🌴🎄"

excerpt: "React terms explained in plain English and doodles🌴🎄."

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
- What is React Native? Why its name includes "Native"?
- What is a native app? What is a web app? Difference between the two?
- What can we build with React Native? What about React?
- What is ReactDOM?
- What is React Renderer?
- How does React Sketch.app work?
- How does ReactVR work?
- What is ReactJS? React.js?

# Other Art Studios
By now you probably have this picture in your head:

![what is React Summary](/images/reactjs-react-native/1-react-summary.png)

You see, React is pretty good at getting portraits out of the studio "Web Browser". More and more people choose to work with React since it frees them from the dirty work of communicating with Domo the slowpoke. They can now spend more time on thinking about a bigger picture instead of the fine details of how the studio operates.

It turns out that "Web Browser" is not the only art studio in town. There are other nifty studios producing unique portraits that are in great demand.

Similar to studio "Web Browser" though, the traditional way of working with those studios is to directly talk to their tree model. Moreover, the staff of those studios speak various different languages. That certainly won't make your job as a director easier.

![studio "iOS" and studio "Android"](/images/reactjs-react-native/2-ios-android.png)

People started to ask React: "Can you work with other studios too on our behalf?" If the answer was yes, it'd be really sweet: Just as with "Web Browser", React could apply the same superpowers to make things really efficient. Furthermore, with React as a mediator in-between, you could speak **the same language** to get portraits from other studios, however exotic they are.

"Consider it done", our superhero replied.

# React Native

React went ahead to summon his gang of helpers. The team "React Native" was formed.

## React Renderer
React took off his cloak and sprinkled some magical dust.

![cloak and magical dust](/images/reactjs-react-native/3-cloak-and-dust.png)

His cloak went alive and became his first helper, "ReactDOM". ReactDOM's only job is to talk to Domo at the studio "Web Browser". This way, React can now focus on taking orders from the director (developer) and drawing quick sketches (virtual DOM).

![ReactDOM talks to Domo](/images/reactjs-react-native/4-reactdom-domo.png)

React also recruited some other helpers similar to ReactDOM -- they are in charge of passing sketches to art studios and talking to them in whatever language they speak. These helpers are called "React Renderers" [^1]. ReactDOM is a renderer too. With the help of Renderers, React can now work with various art studios without being distracted from his core responsibilities.

![renderers to talk to Web, iOS and Android](/images/reactjs-react-native/5-renderers.png)

This means a lot to you as a director. You can just talk to React in the same language and use the same pattern of words [^2]. React and his team handle the differences between studios and make sure you get the artwork of the best quality.

## A Complete Platform
There's actually more going on at the studio "Web Browser" that we haven't had a chance to study. To create great artwork, we'd need the help of some other folks who take care of things like lighting, makeup, stage props etc.

![other folks at Web Browser](/images/reactjs-react-native/6-other-folks-at-web.png)

In the past React didn't really care about anything unrelated to Domo's poses while the director picked those other folks. After all, at studio "Web Browser", everybody speaks the same language (JavaScript) and it's relatively easy for the director to communicate with everyone who's involved.

However, when working with studios where the staff speak a different language, it becomes important to find professionals who can communicate with both the director and the studios.

React casted his summon spell. New superheros joined. The team "React Native" was formed. You can now just talk to this team and get things done.

![other superheros](/images/reactjs-react-native/7-summon.png)

At this point, we say React Native is a complete platform because it provides all you need to build a full app (more on this [later](#comparison)).

## Native UI
TODO
- performance
- native look and feel
- hybrid app: outsource to Studio Web. It has its place especially in early days, but its ux sucks

# React Sketch.app, ReactVR, React XYZ...
Recently Airbnb recently released a nifty tool called [React Sketch.app](TODO) which can convert React code into image layers in Sketch. Can you guess how it works?

Right! It's essentially React Native with a renderer that talks to the tree model in Sketch!

![React Native team and Sketch Renderer](/images/reactjs-react-native/9-sketch.png)

Because React Sketch.app is based on React Native, which is a full package, we can do fancy things like fetching data from a real API and rendering it in Sketch.

In the meantime, many other variations of React Native are created to support building apps for [Windows](TODO), [Mac](TODO), [VR](TODO) etc.

This means, as long as you master the essence of React,  you can build apps for a gazillion of platforms (and counting), in JavaScript, with the same pattern of thinking. As
the creators of React Native nicely put, **"Learn once, write everywhere"**.

<a name="comparison">

# Comparing React with React Native
Fantasy stories aside, let's recap in a language that's more connected to the reality.

React was originally created for building user interfaces on the web. Its name has always been "React" since the [day one](https://web.archive.org/web/20130529213355/https://facebook.github.io/react/) but let's call it "React Web" to avoid confusion. Because it's just a small UI library, **you can't build a full application with just React Web alone**. You'd need for example CSS for styling, webpack for preprocessing and bundling the code, Firebase for persisting the data etc. TODO is firebase a good example?

To support platforms other than Web, such as iOS and Android, the original React was split into two parts: the new React (the cloakless superhero) and ReactDOM the renderer (the alive cloak). This separation of roles made it easy to write new code (renderers) that adapt to new platforms while maintaining a shared core. Therefore, React Native was born.

Compared to React Web, React Native is a complete platform. **With React Native, you can definitely build a full app**[^3]. It includes a lot of stuff:

- the new React as its core (our cloakless superhero),
- renderers for iOS and Android,
- tools that convert and bundle code into installable apps,
- native UI widgets (status bar, ListView etc.) and animation,
- toolkit for styling and laying out the UI (flexbox),
- essential parts that make up of most apps (such as networking),
- parts that provide native functionalities such as clipboard, accelerometer and storage.
- ...

React Native is a big deal.

In the past, building apps for both iOS and Android meant two completely separate codebases. Developers had to learn two different languages and toolchains. The same business logic had to be implemented twice. It was difficult and expensive to create an app and even more so to maintain it in the long run.

React Native changes that. Developers are now able to build mobile apps in one language (JavaScript) using one set of tools (web development toolchain). Business logic only needs to be implemented once and can be easily shared between platforms. This opens up a huge opportunity for web developers and designers and even native mobile developers because React Native greatly simplifies mobile development.

The user interfaces built with React Native are truly native. TODO

React Native is designed to be platform agnostic. This means we can easily extend React Native to support other platforms -- mostly by writing a new React Renderer [^4]. The same person who understands React basics can build apps for many platforms using the same language and same patterns.

Again, "Learn once, write everywhere".

# What About ReactJS And React.js?
You might have heard ReactJS (or React.js) a lot -- and I used it too. In fact it's never an official name [^5].

Because JS libraries tend to have a name "XYZ.js" and React is a JavaScript library, perhaps people just appended "JS" or ".js" voluntarily. Since React was a library for the web in the beginning, many people use ReactJS or React.js to refer to React Web, the duo of React and ReactDOM.

Following the de facto convention, when I say ReactJS, I mean React Web too.

# Conclusion
TODO

# Footnotes
[^1]: Renderers update the object model in the target platform according to the virtual DOM. The object model determines what's drawn on the browser window or phone screen. This effectively "renders" stuff on the "canvas" of the target platform. That's how they got this name.

[^2]: TODO programming paradigm. Declarative is a paradigm, imperative is a paradigm

[^3]: If you are looking for a in-depth technical comparison between React Native and React Web, check out this [post](https://medium.com/@alexmngn/from-reactjs-to-react-native-what-are-the-main-differences-between-both-d6e8e88ebf24).

[^4]: The idea of React Renderers is very powerful. Here are [a list](https://github.com/chentsulin/awesome-react-renderer) of cool renderers that make it possible to build many different things with React.

[^5]: On NPM, the central repository for JavaScript libraries, you can find both [reactjs](https://www.npmjs.com/package/reactjs) and [react](https://www.npmjs.com/package/react). Can you tell which one is the real React?

  <a name="endofpost">
