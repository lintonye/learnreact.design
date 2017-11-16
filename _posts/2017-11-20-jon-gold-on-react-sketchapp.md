---
layout: post
last-modified: '2017-06-23'

title: "What Is React Native?"
subtitle: "React terms in plain English and doodles🌴🎄⚛"

excerpt: "React terms explained in plain English and doodles🌴🎄⚛"

author:
  name: Linton Ye
  twitter: lintonye
  bio: Freelance full-stack developer in BC Canada (GMT-8). Android, React Native, Node.js, MongoDB, PostgreSQL. <a href="mailto:linton@jimulabs.com">Contact me.</a>
  image: linton.jpg
---

https://github.com/airbnb/react-sketchapp/issues/172

## Why build it?

## Goals
- For large design/development teams, encourage people to be using the design system.
- minimize back-and-forth between design and engineering

> We have a design system at Airbnb. The system has probably 200+ components. We have 100 designers and probably almost 1000 engineers. We want people to be using the design system, not all the time because otherwise the system doesn't grow and change, but most of the time we'd love people to be using the system. That's one goal.

> Another goal is we want absolute minimum of the time between design and engineering, potentially back-and-forth of annotating specs, do redlines and all that stuff. Any friction like that, when you times by how many designers and engineers. The relationship becomes not scalable.


## Workflow
The current workflow is: we have a designs system team that creates the system. And we have a production design team who creates and updates the templates for all the design system files. (Sketch templates)

We played around smart symbols in Sketch. But essentially it's a big Sketch file stored on Dropbox or whatever. That has the tendancy to get out of sync quite like how the code is. We have iOS, Android, Web and React Native -- all different codebases. It's very possible that the engineering implementations are out of sync with themselves. Also there is a huge possibility that the design system templates get out of sync with any of the implementations. There are so many chances of failure.

What we wanted to do with the system as a whole was to make 100% of the time everything is right everywhere. You can solve that pretty easily in code. You can have scripts that generate swift or java files to keep code in sync. (You can do) diffing, testing and all those things.

With Sketch files, there are not really much you can do. You have those human-updated things. It's kind of fine if you have 5 components. But if you have 500 components, that's a huge sketch file. The possibility of things being out of sync with so many moving parts is huge. 

So we were like, what if we just render the sketch file? The Sketch APIs are painful. So if we just create a React wraper and just render it (to sketch file).

That was one of the motivations - if we can just render things to Sketch, then at least stuff will be in sync.

That's the stuff you can play with in React Sketcha.app.. [7:10] You can write code to generate static sketch files, you can feed it with data, you can use react-primitive, real components etc. 

It doesn't really solve design workflow necessarily, or it doesn't stop things like, say you have a component with text that can be one to three lines long. In Sketch you can't really express that. I guess you kind of can with constraints but constraints in Sketch is not really the same layout system as in production (Flexbox). 

[7:57] You want to be able to design with these components parametrically. You want to be able to say I have a component that has a boolean state and you can toggle it. You just want to see what it looks like. Maybe it has a filled background I can toggle with a boolean state. Or maybe it has a checkbox, or maybe it has an array of data, or an image...

[8:20] all these things Sketch's symbols can't capture. (since we launched, we've added render to a symbol). But Sketch symbols are just not the real thing. This whole movement is about trying to get designers to design with the real things. Use the components parametrically as they are designed. So you are always designing with the real truth of things.

[8:50] That's something that we haven't released yet. I don't know if we are gonna be able to release. But it's a Sketch plugin you can browse your components from your React Native code base, you can drag them into Sketch and render them in Sketch because it just uses react-primitives that React Sketch.app knows how to render.  We've built a control panel similar to symbol's control panel where you can change the parameters, booleans that kind of thing for a component. To me, that's like the full vision. Perhaps someone should build it because how tightly integrated with our internal secrets.

[10:05] It's not we just render things to Sketch. It's like we can use cross-platform components and render them everywhere and build whatever input/output things we want for them. I don't know if you've seen the project we've done recently. (send links) It takes hand-drawn design and use AI to render it. 

[10:47] Or another blog post I wrote about using markdown as a design tool. None of these actually render to Sketch. They could render to Sketch if you want them to.  

[11:14] the thing I'm trying to push is about more than Sketch. It's about getting designers to think in terms of components. [11:30] Once you can render any component, as a designer, you can create tools you want... You can create a markdown tool that renders to Sketch, you can create an AI tool that renders to the browser, you can create an AI that renders to Sketch. This whole thing is a lot more than rendering React components to Sketch.

[12:11] It's about what we can do if we can render any components anywhere and come up with any way of rendering these things. (sending link of a tweet) (he said he'll try to send a screenshot of the latest one. TODO request from him)

[12:55] The idea is that we can create the best input/output mechanisms for ourselves, and other designers can also create the beset input/output mechanism for themselves. .. something interesting way of creating a frontend that renders to Sketch.

(On using React Sketch.app to build other tools)

[13:19] Archetype. where you can design a typography system in browser... It doesn't have to be an index.js file that you can render, you can do whatever you want. You can have a form field, do face recgonition with your webcam. ...
(Use CocaScript to drive react-sketchapp and render things in Sketch)

It's just a render target..

[16:39] The custom UI we built renders a webview (in Sketch) and then renders React inside that webview. Because we use react-primitives for React components, we can render the same component side-by-side, in the webview (as part of the UI) and in the Sketch canvas. 

[16:52] you only need to write tiny bit of CocaScript (to build the UI). (I guess CocaScript is a pain in the butt?) React is the whole thing. Hey designers, if you can learn React, you can do whatever you want, you'll be like superheros.

(How to tweak the UI after drag&droping from the component palatte?)
[18:10] It's totally up to you. The cool thing about react-sketch.app is that it just outputs normal sketch layers. It's not super nested symbols you have to click into. You just get the cleanest sketch layers that we can give you.  At that point, it really depends. It depends on your company, your culture, and your design team and how you'd like to collaborate. If it's just you or a small team, you can go crazy and do whatever you want. If it's a big team like Airbnb, Dropbox, Facebook or Google, you probably have some kind of system to collaborate stuff back to the design system.

[18:52] To me, we just want to give people tools that cut out the work they don't have to do so they can focus on the work they want to do. 

[20:55] It's a flexible enough tool, it's like a foundational technology that people can use to make everything else.

[21:05] 
(To render production code, one big requirement is react-primitive)
Yes. There are other ways around it. For example you can do a custom webpack config to alias react native to react sketch.app

[23:01] If you are converting a React Native app, there are still something pretty difficult to do. But at least for simple components, switching to react-primitives is easy. The real hurdle is that when people have an app built with React-dom, h1, span etc. How do I convert this? I don't have a good answer. We just haven't got there yet. I have a feeling that you can probably write a transformer, some kind of codemod which converts for example h1 to Text, span to Text etc. But this seems like a really difficult problem. But we'll get there eventually, because the Airbnb website is still a react-dom app.

[24:40] If you have components that have been built with react native in mind, it should be pretty easy way to refactor that. (send link of his codemod)

[25:20] As a designer, when you design a design system, rather than thinking in terms of span, h1, you think in terms of view, text, image, that'd make everything so much easier. all of these cross-platform tools, with all the combination of inputs and outputs, they work a lot easier if you can use only one set of standardalized API for describing components instead of a different set of API for every single platform. 

(smaller team use case)
[26:25] defining their design systems, sketch templates, taking a designed screen and then going back to an editable sketch file.

(usage in airbnb)
[28:34] as a product designer, you just use templates. If you are not the one who generates templates, you don't know where the templates are generated from. It kinda doesn't matter to you. It's like you don't know how the food is made in the kitchen, you just eat. The component picker ... hopefully will get rolled out to everyone in a month or two.

(future render target)
Figma. I don't know if we are gonna have time to do it, but that's my thought about what the next Sketch is. You can render to Figma and Sketch side-by-side, and people can choose whatever design tool they wanted.

The vision is to use react-primitives as much as possible and then you can render your components everywhere.

  <a name="endofpost">
