
Say hi to our DOM guy -- Doodle-On-the-wall Man.

His only favorite thing is to listen to your commands and draw stuff on a wall. ^1

^1: In technical terms, DOM is an API that a developer can use to manipulate HTML documents. Essentially, you write code to communicate with DOM and instruct the browser to do stuff. Our DOM-guy analogy isn't that far off, right?

## Bonus: differences between native mobile apps and web apps?

- A Tree
  - I am gr...
  - can pose, change shapes,
  - different yoga poses etc.
- The relation to real terms is more important than the closeness of the analogy
- Components live in the instruction side, mainly to make the "director"'s work easier. Model is the same model, painter is the same painter
- picture of all kinds of trees in a phone
- different kinds of tree men/women, representing object models on different platforms.
- imperative vs declarative:
  - tell exactly how to pose vs. drawing a sketch
- raw js vs jQuery
  - using raw js is like talking to Domo face to face
  - using jquery is like talking to Domo via phone, more powerful, more convenient

- DOM -- Doodle-On-the-wall Man

- important to connect the analogy back to a more technical description

- Static web page:
  - hand a blueprint to DOM guy, who draws a picture on the wall according to the blueprint (perhaps just fill it with colors)
- JQuery:
  - blueprint with blank squares, a person directly tells DOM guy to fill blank squares
- JQuery problem 1:
  - "who told him to draw that rabbit with horns?": the DOM guy looks confused, the two requesters look innocent
  - solution: templates, instead of allowing arbitrary changes, use templates to define possible changes
- Problem 2: Slow DOM:
  - instruction to the DOM guy: draw a blue cow, change the color of rabbit to red, ...; the DOM guy is still drawing the first rabbit, stick out a hand and says: "hold on, let me finish this rabbit first".
- Virtual DOM:
  - another person sitting between the DOM guy and the requester, acting fast. queue up requests and give it to the DOM guy in batches. Smart merge: if a request says: 'draw a rabbit in blue' and then 'draw a rabbit in red', the final request sent to DOM guy is 'draw a rabbit in red, ignore blue', "don't start from scratch, just repaint that rabbit in the corner in yellow"
- Components:
  - in the blueprint: <rabbits-eating-carrots count="2"/>
- Reactive UI
  - spreadsheet
  - __ + __ = __
  - <rabbit-eating food={____} />



- Functional reactive UI
  - new sheet of blueprint instead of easing and updating an existing blueprint
  - sounds crazy but ...
  - benefits of new blueprints?
    - easier to draw blueprints? no need to worry about the history
- Unidirectional data flow



Clock and gears analogy
 - what you've seen in the browser are like the clock hands and the time, DOM is like the gears

- Browser runs JS
- DOM
  - What is it?
  - manipulation is expensive
- imperative vs declarative
  - jquery
    - cross-browser API
    - DOM is slow
    - tight coupling with HTML
    - DOM event handlers?
- no templates


- Clearly state prerequisite and goals
  - Goals need to be precise and validatable
- Draw some doodles?
- Ask readers to say whether the goals are achieved for themselves
- Two-part post
  - Why React? What is React?
    - History of web development
      - static pages => static pages with forms => single page apps
      - jQuery update DOM: cons:
      - JS frameworks: https://www.quora.com/Is-better-to-learn-jQuery-Ember-js-or-Backbone-js
    - What is React in a single sentence?
      - Goal: use terms that V can understand!
    - Core ideas of React
      - Components
        - I love the thoughts behind Atomic design and the thinking about reusable design patterns. Everything is components, and a component can consist of other components making a design pattern.
        - Interactive components combining both presentation and interaction.
        - Templates vs. components
      - Functional, Reactive UI
        - In a traditional JavaScript application, you need to look at what data changed and imperatively make changes to the DOM to keep it up-to-date. Even AngularJS, which provides a declarative interface via directives and data binding requires a linking function to manually update DOM nodes.
        - Reactive programming is about the flow of data and declaratively maintaining the relationships between that data.
        - If you did this in vanilla JavaScript or jQuery, you’d have to explicitly listen to ‘change’ events on the inputs, and then manually update the value of C1.
        - mutable, stateful vs immutable, stateless
        - Update the whole thing
      - Single direction data flow
      - Virtual DOM
    - How do these concepts relate to design?
  - React DOM, React Native, React Sketch.app
    - difference between Web apps, Native apps, and web apps embedded in webview
    - How do these concepts relate to design?
    - React is significantly more SEO friendly than most JavaScript MVC frameworks because it is based on a virtual DOM you can use it on the server
- Ask V to review the posts


- Reader profile
  - Know HTML+CSS
  - Know UI
  - Visually focused

- Reactive user interface

- React as a paradigm, a way of thinking
- RN: batteries included
- RJS: must set up the project; though there is Create React App
- RN vs mobile pages
- Native app vs web app
  - perhaps include a video showing the different performance
- React Sketch.app
- To make it even more complicated:
  - react-native-web: https://github.com/necolas/react-native-web
  - https://github.com/Microsoft/reactxp
- cannot build a fully functional dynamic application with React alone

- layout:
  - RN: flexbox
  - RJ: CSS
- Animations:
  - RN: no CSS Animations

- Links
  - https://medium.com/@alexmngn/from-reactjs-to-react-native-what-are-the-main-differences-between-both-d6e8e88ebf24
  - http://stackoverflow.com/questions/34641582/what-is-difference-between-react-native-vs-react
  - https://www.quora.com/Whats-the-main-difference-between-ReactJS-and-React-Native
  - http://blog.andrewray.me/reactjs-for-stupid-people/
  - https://facebook.github.io/react/blog/2013/06/05/why-react.html
  - https://docs.google.com/presentation/d/1afMLTCpRxhJpurQ97VBHCZkLbR1TEsRnd3yyxuSQ5YY/edit#slide=id.g380053cce_1776
  - https://medium.com/front-end-hacking/react-for-designers-3fbc7b6560dd
  - http://bradfrost.com/blog/post/atomic-web-design/
  - https://emberway.io/ember-js-reactive-programming-computed-properties-and-observers-cf80c2fbcfc

TODOs:
- try out Create React App
