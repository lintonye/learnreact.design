---
layout: post
last-modified: '2017-06-20'

title: "What Is React Native?"
subtitle: "React terms in plain English and doodles🌴🎄⚛"

excerpt: "React terms explained in plain English and doodles🌴🎄⚛"

author:
  name: Linton Ye
  twitter: lintonye
  bio: Freelance full-stack developer in BC Canada (GMT-8). Android, React Native, Node.js, MongoDB, PostgreSQL. <a href="mailto:linton@jimulabs.com">Contact me.</a>
  image: linton.jpg
---

_This series of posts will be the very first part of the ["React for Designers" course](http://learnreact.design) I'm creating. Be sure to [sign up](http://learnreact.design) to receive exclusive updates!_

- _[What is React?](/2017/06/08/what-is-react/)_
- _What is React Native? (this post)_
- _React Native vs. Hybrids (coming soon)_
- _[Components, Props and State](/2017/08/16/components-props-state/)_
- _[Props and State Re-explained](/2018/01/15/props-state-reexplained/)_

---

***NOTE: This is an abandoned draft which uses too much metaphor. See [here](/2017/06/20/what-is-react-native/) for the official post.***

In the [previous post](/2017/06/08/what-is-react/), we looked at what React is and what makes it special. Today let's study React Native: what it's for, where it came from, how it's different from React and why it's cool.

<a name="learning-goals">

# Learning Goals
After reading this post, I'll get you to come back here. Hopefully you'll be able to answer these questions easily:

- What is React Native? Why does its name include "Native"?
- Why is React Native cool?
- What can we build with React Native? What about React?
- Where does ReactDOM come from? What does it do?
- What does a React Renderer do?
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

React looked at all the studios and realized that the biggest challenge was the different languages the staff spoke.

React told us that he needed a team. He wanted to name the team "React Native".

## Renderers And The New React

At studio "Web Browser", React used to talk to Domo a lot. But he knew it would drive him crazy if he had to talk to all those tree folks at different studios himself while doing many other things.

![talk to many tree folks and crazy](/images/reactjs-react-native/2.5-crazy.png)

He wanted someone to take care of the models. This way, he could focus on what he did the best: taking orders from the director (developer), drawing quick sketches (virtual DOM) and analyzing them.

React took off his cloak and sprinkled some magic dust.

![cloak and magical dust](/images/reactjs-react-native/3-cloak-and-dust.png)

His cloak went alive and became his first helper, "ReactDOM",  whose only job was to talk to Domo at "Web Browser". Freed from the burden of dealing with Domo, React felt refreshed than ever.

![ReactDOM talks to Domo](/images/reactjs-react-native/4-reactdom-domo.png)

Once convinced of the capability of ReactDOM, React recruited some more similar helpers -- they are in charge of talking to the models in whatever language they speak. React likes to call these helpers "React Renderers" [^1]. ReactDOM is a renderer too. With the help of Renderers, React can now work with various art studios without being distracted from his core responsibilities.

![renderers to talk to Web, iOS and Android](/images/reactjs-react-native/5-renderers.png)

This means a lot to you as a director. By just talking to React in **a single language, with the same old pattern of words**[^2], you can get unique portraits from various art studios -- no longer limited to studio "Web Browser". React and his renderers handle the nuances of different studios and make sure you get the artwork of the best quality.

## A Complete Platform
There's actually more going on at the studio "Web Browser" that we haven't had a chance to study. To create great artwork, we'd need the help of some other folks who take care of things like lighting, makeup, stage props etc.

![other folks at Web Browser](/images/reactjs-react-native/6-other-folks-at-web.png)

In the past React didn't really care about anything unrelated to Domo's poses while the director chased after those other folks. After all, at studio "Web Browser", everybody speaks the same language and it's relatively easy for the director to communicate with everyone who's involved.

However, when working with studios where the staff speak a different language, it becomes important to find professionals who can communicate with both the director and the studios.

React casted his summon spell. New superheros joined React and his renderers. The team "React Native" was formed. You can now just talk to this team and get everything done.

![other superheros](/images/reactjs-react-native/7-summon.png)

At this point, we say React Native is a complete platform because it includes all you need to build a full app. In comparison, the original React is only in charge of UI and you'll need to include other parts yourself to create a web app. More on this [later](#comparison).

## Native UI
Have you ever wondered why React Native is labeled *Native*? That's actually its branding feature: the UI built with React Native consists of **native UI widgets** that perform well and look/feel consistent, not some simulated crap wrapped in a WebView.

You know, those little things, such as scrolling acceleration, animations, keyboard behavior and drop shadows, actually play an important role in the user experience of your app. If those are not consistent with other apps on the phone, users will quickly get frustrated.

I originally intended to explain here what "native" really means and why React Native performs better. But my notes quickly grew into a full page after a few brainstorming sessions. Let's leave that as a future post of its own.

For now, I want you to just remember that native UI is one of the great things that make React Native shine.

So here you go, React Native is a complete platform that allows you to build truly native apps following React paradigm[^2], in JavaScript.

![React Native key points summary](/images/reactjs-react-native/8-react-native-summary.png)

# React Sketch.app, ReactVR, React XYZ...
Recently Airbnb recently released a nifty tool called [React Sketch.app](https://airbnb.design/painting-with-code/) which converts React code into image layers in Sketch. Can you guess how it works?

Right! It's essentially React Native with a renderer who talks to the tree model in Sketch!

![React Native team and Sketch Renderer](/images/reactjs-react-native/9-sketch.png)

Because React Sketch.app is based on React Native, which is a full package, we can do fancy things like fetching data from a real API and rendering it in Sketch.

In the meantime, many other variations of React Native are created to support building apps for [Windows](https://github.com/Microsoft/react-native-windows), [macOS](https://github.com/ptmt/react-native-macos), [VR](https://github.com/facebook/react-vr) etc.

This means, as long as you master the essence of React,  you can build apps for a gazillion of platforms (and counting), in JavaScript, with the same pattern of thinking. As
the creators of React Native nicely put, **"learn once, write anywhere"**.

<a name="comparison">

# Comparing React with React Native
Fantasy stories aside, let's recap in a language that's more connected to the reality.

React was originally created for building user interfaces on the web. Its name has always been "React" since the [day one](https://web.archive.org/web/20130529213355/https://facebook.github.io/react/) but let's call it "React Web" to avoid confusion. Because it's just a small UI library, **you can't build a full application with just React Web alone**. You'd need for example CSS for styling, webpack for preprocessing and bundling the code, Firebase for persisting the data etc.

To support platforms other than Web, such as iOS and Android, the original React was split into two parts: the new React (the cloakless superhero) and ReactDOM the renderer (the alive cloak). This separation of roles made it easy to write new code (renderers) that adapt to new platforms while maintaining a shared core. Therefore, React Native was born.

Compared to React Web, React Native is a complete platform which includes a lot of stuff:

- the new React as its core (our cloakless superhero),
- renderers for iOS and Android,
- tools that convert and bundle code into installable apps,
- native UI widgets (status bar, ListView etc.) and animations,
- toolkit for styling and laying out the UI (flexbox),
- essential parts that make up of most apps (such as networking),
- parts that provide native functionalities such as clipboard, accelerometer and storage.
- ...

**With React Native, you can definitely build a full app**[^3].

React Native is a big deal.

In the past, building apps for both iOS and Android meant two completely separate codebases. Developers had to learn two different languages and toolchains. The same business logic had to be implemented twice. It was difficult and expensive to create an app and even more so to maintain it in the long run.

React Native changes that. Developers are now able to build mobile apps in one language (JavaScript) using one set of tools (web development toolchain). Business logic only needs to be implemented once and can be easily shared between platforms. This opens up a huge opportunity for web developers and designers and even native mobile developers because React Native greatly simplifies mobile development.

The user interfaces built with React Native are truly native. The apps look and feel consistent with the rest of the platform. They are often indistinguishable from the apps written in native languages such as Swift and Java, due to the full utilization of native UI widgets.

React Native can be easily extended to support other platforms -- mostly by writing a new React Renderer [^4]. The same person who understands React basics can build apps for many platforms using the same language and the same React paradigm.

Again, **"learn once, write anywhere"**.

# What About ReactJS And React.js?
You might have heard ReactJS (or React.js) a lot -- and I used it too. In fact it's never an official name [^5].

Because JavaScript libraries tend to be named "XyzJS" or "Xyz.js" and React is a JavaScript library, perhaps people just appended "JS" or ".js" to its name voluntarily. Since React was a library for the web in the beginning, many people use ReactJS or React.js to refer to React Web, the duo of React and ReactDOM.

Following the de facto convention, when I say ReactJS, I mean React Web too.

# Conclusion
Awesome! We've gone over quite a few things so far. We've learned a bit of history of React and how he put together his team, React Native. Being a complete platform, React Native includes everything that you need to build native apps in JavaScript and React paradigm. React Native now supports many platforms including iOS, Android, Windows, macOS, Sketch.app and even VR. "Learn once, write anywhere"!

In the next post, we'll look at what a *native* app really is and why React Native is one of the best ways to build native apps.

I encourage you to go back to the [Learning Goals](#learning-goals) to see if you can answer all the questions. Let me know if you have any questions or comments!

---

**Want to learn more about React? [Sign up](http://learnreact.design) now and receive exclusive updates!**

---

[//]: # Backstage
[//]: - TODO record video to show thought process - walking in the bushes.

# Footnotes
[^1]: Renderers update the object model (tree) in the target platform according to the virtual DOM. The object model determines what's drawn on the browser window or phone screen. This effectively "renders" stuff on the "canvas" of the target platform. That's how they got this name.

[^2]: The pattern of words you use to talk to React is essentially the way how you think about a problem and how you describe it and its solution. In tech slang, it is called **paradigm**. Declarative and imperative programming are both paradigms. The **React paradigm** is about how to break down UI into components, how to pass data around etc.

[^3]: If you are looking for a in-depth technical comparison between React Native and React Web, check out this [post](https://medium.com/@alexmngn/from-reactjs-to-react-native-what-are-the-main-differences-between-both-d6e8e88ebf24).

[^4]: The idea of React Renderers is very powerful. Here are [a list](https://github.com/chentsulin/awesome-react-renderer) of cool renderers that make it possible to build many different things with React.

[^5]: In NPM, the central repository for JavaScript libraries, you can find both [reactjs](https://www.npmjs.com/package/reactjs) and [react](https://www.npmjs.com/package/react). Can you tell which one is the real React?

  <a name="endofpost">
