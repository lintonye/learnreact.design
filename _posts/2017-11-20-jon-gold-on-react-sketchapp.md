---
layout: post
last-modified: '2017-06-23'

title: "React Sketch.app: a glimpse into the future"
subtitle: "A conversation with Jon Gold, the creator of React Sketch.app"

excerpt: "React terms explained in plain English and doodles🌴🎄⚛"

author:
  name: Linton Ye
  twitter: lintonye
  bio: Freelance full-stack developer in BC Canada (GMT-8). Android, React Native, Node.js, MongoDB, PostgreSQL. <a href="mailto:linton@jimulabs.com">Contact me.</a>
  image: linton.jpg
---

![](/images/jon-gold/jon-gold.jpg)
![](/images/jon-gold/react-sketch-app.png)

I've had the fortune to talk to Airbnb's Jon Gold, the creator of React Sketch.app. 

## Why building it?
Airbnb has a large team of designers and engineers. They want to ecourage people to be using their design system and streamline the communication between designers and engineers.

> We have a design system at Airbnb. The system has probably 200+ components. We have 100 designers and probably almost 1000 engineers. The current workflow is: the design system team creates the system. And we have a production design team who creates and updates the (Sketch) templates for all the design system files. We want people to be using the design system, not all the time because otherwise the system doesn't grow and change, but most of the time we'd love people to be using the system. That's one goal.

> Another goal is we want absolute minimum of the time between design and engineering, potentially back-and-forth of annotating specs, doing redlines and all that stuff. With any friction like that, times by the number of designers and engineers, the relationship becomes not scalable.

However, the central artifacts in this workflow, the design system templates, tend to get out of sync with implementations very quickly.

> (In order to create the design system templates, ) We played around smart symbols in Sketch. But essentially it's a big Sketch file stored on Dropbox. That has the tendancy of getting out of sync quite like how the code is. We have iOS, Android, Web and React Native -- all different codebases. It's very possible that the engineering implementations are out of sync with themselves. There is a huge possibility that the design system templates get out of sync with any of the implementations. There are so many chances of failure.

> With Sketch files, there are not really much you can do. You have those human-updated things. It's kind of fine if you have 5 components. But if you have 500 components, that's a huge sketch file. The possibility of things being out of sync with so many moving parts is huge. 

They set out to solve the synchronization issue with code, and use code as the only source of truth. Therefore, React Sketch.app was born.

> What we wanted to do with the system as a whole was to make 100% of the time everything is right everywhere. You can solve that pretty easily in code. You can have scripts that generate swift or java files to keep code in sync. (You can do) diffing, testing and all those things.

> So we were like, what if we just render the sketch file? We just created a React wraper and just render it (to sketch file).

> That's the stuff you can play with in React Sketcha.app... You can write code to generate static sketch files, you can feed it with data, you can use react-primitive, real components etc. 

## Full vision
Here's the fun part. Although React Sketch.app solves a pratical issue very well, Jon only considers it as step number one. He talked a lot about the full vision behind building it.

### Component picker plugin

> It's a Sketch plugin you can browse your components from your React Native code base, you can drag them into Sketch and render them in Sketch because it just uses react-primitives that React Sketch.app knows how to render.  We've built a control panel similar to symbol's control panel where you can change the parameters, booleans that kind of thing for a component. To me, that's like the full vision.  I don't know if we are gonna be able to release. Perhaps someone should build it because how tightly integrated with our internal secrets.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">FAQ: &quot;but why would you want to render React Native components to webviews or Sketch?&quot;<br>me: &quot;hold my kombucha&quot;<br><br>⚛️💎 <a href="https://t.co/D0yTtMjMVS">pic.twitter.com/D0yTtMjMVS</a></p>&mdash; ¸„.-•~¹°”ˆ˜¨ ĴÖŅ ĠÖĻĐ ¨˜ˆ”°¹~•-.„¸ (@jongold) <a href="https://twitter.com/jongold/status/866854672421634049?ref_src=twsrc%5Etfw">May 23, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


### Render everywhere

Sketch is just a render target..

> It's not we just render things to Sketch. It's like we can use cross-platform components and render them everywhere and build whatever input/output things we want for them. 

> I don't know if you've seen the project we've done recently. (send links) It takes hand-drawn design and use AI to render it. 

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Converting sketches to code—our design technology team shares their first exploration into AI assisted design ✏️💻 &gt; <a href="https://t.co/qSshvcEtqu">https://t.co/qSshvcEtqu</a> <a href="https://t.co/hyEr42y6Ey">pic.twitter.com/hyEr42y6Ey</a></p>&mdash; Airbnb Design (@Airbnbdesign) <a href="https://twitter.com/Airbnbdesign/status/922970398169350144?ref_src=twsrc%5Etfw">October 24, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


> another [blog post](http://www.jon.gold/2017/08/dragging-rectangles/) I wrote about using markdown as a design tool. None of these actually render to Sketch. They could render to Sketch if you want them to.  

![](/images/jon-gold/literate-dls.png)


### Design with components
As designers, perhaps just be open-minded about using all these combinations of tools?

> The thing I'm trying to push is about more than Sketch. It's about getting designers to think in terms of components. Once you can render any component, as a designer, you can create any tools you want... You can create a markdown tool that renders to Sketch, you can create an AI tool that renders to the browser, you can create an AI that renders to Sketch. This whole thing is a lot more than rendering React components to Sketch.

> It's about what we can do if we can render any components anywhere and come up with any way of rendering these things. (sending link of a tweet) (he said he'll try to send a screenshot of the latest one. TODO request from him)

> The idea is that we can create the best input/output mechanisms for ourselves, and other designers can also create the beset input/output mechanism for themselves. .. something interesting way of creating a frontend that renders to Sketch.

Design with real things, components

> all these things Sketch's symbols can't capture. (since we launched, we've added render to a symbol). But Sketch symbols are just not the real thing. 

> This whole movement is about trying to get designers to design with the real things. Use the components parametrically as they are designed. So you are always designing with the real truth of things.

> You want to be able to design with these components parametrically. You want to be able to say I have a component that has a boolean state and you can toggle it. You just want to see what it looks like. Maybe it has a filled background I can toggle with a boolean state. Or maybe it has a checkbox, or maybe it has an array of data, or an image...

### As a platform for building other design tools
(On using React Sketch.app to build other tools)

This project makes it easier for tool developers to interact with Sketch.

> It's a flexible enough tool, it's like a foundational technology that people can use to make everything else.

> Archetype. where you can design a typography system in browser... It doesn't have to be an index.js file that you can render, you can do whatever you want. You can have a form field, do face recgonition with your webcam. ...
(Use CocaScript to drive react-sketchapp and render things in Sketch)

![](/images/jon-gold/archetype.png)

> The custom UI we built renders a webview (in Sketch) and then renders React inside that webview. Because we use react-primitives for React components, we can render the same component side-by-side, in the webview (as part of the UI) and in the Sketch canvas. 

> you only need to write tiny bit of CocaScript (to build the UI). (I guess CocaScript is a pain in the butt?) React is the whole thing. 

> Hey designers, if you can learn React, you can do whatever you want, you'll be like superheros.

## But, but, how are we supposed to use React Sketch.app?
> It's totally up to you. The cool thing about react-sketch.app is that it just outputs normal sketch layers. It's not super nested symbols you have to click into. You just get the cleanest sketch layers that we can give you.  At that point, it really depends. It depends on your company, your culture, and your design team and how you'd like to collaborate. If it's just you or a small team, you can go crazy and do whatever you want. If it's a big team like Airbnb, Dropbox, Facebook or Google, you probably have some kind of system to collaborate stuff back to the design system.

https://github.com/airbnb/react-sketchapp/issues/172

## Big requirement: react-primitives
The vision is to use react-primitives as much as possible and then you can render your components everywhere. At least, you can push within your company about using react-primitives.

To reap all the benefits of this system, you'd use react-primitive everywhere.

> [25:20] As a designer, when you design a design system, rather than thinking in terms of span, h1, you think in terms of view, text, image, that'd make everything so much easier. all of these cross-platform tools, with all the combination of inputs and outputs, they work a lot easier if you can use only one set of standardalized API for describing components instead of a different set of API for every single platform. 

### Challenge: existing codebase

(To render production code, one big requirement is react-primitive)
> Yes. There are other ways around it. For example you can do a custom webpack config to alias react native to react sketch.app

[24:40] If you have components that have been built with react native in mind, it should be pretty easy way to refactor that. (send link of his codemod)

[23:01] If you are converting a React Native app, there are still something pretty difficult to do. But at least for simple components, switching to react-primitives is easy. The real hurdle is that when people have an app built with React-dom, h1, span etc. How do I convert this? I don't have a good answer. We just haven't got there yet. I have a feeling that you can probably write a transformer, some kind of codemod which converts for example h1 to Text, span to Text etc. But this seems like a really difficult problem. But we'll get there eventually, because the Airbnb website is still a react-dom app.


## Misc

### Usage in airbnb
> as a product designer, you just use templates. If you are not the one who generates templates, you don't know where the templates are generated from. It kinda doesn't matter to you. It's like you don't know how the food is made in the kitchen, you just eat. The component picker ... hopefully will get rolled out to everyone in a month or two.

### future render target
> Figma. I don't know if we are gonna have time to do it, but that's my thought about what the next Sketch is. You can render to Figma and Sketch side-by-side, and people can choose whatever design tool they wanted.

### smaller team use case
> defining their design systems, sketch templates, taking a designed screen and then going back to an editable sketch file.

<a name="endofpost">
