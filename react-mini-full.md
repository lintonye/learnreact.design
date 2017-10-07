---
layout: page
title: 8-day React for Designers
subtitle: 'A FREE email course on React fundamentals - No JavaScript knowledge needed!'
author:
  name: Linton Ye
  twitter: lintonye
  image: linton-face.jpg
---

## Day 1/8: What is React?

Great move! 🙌 Welcome to 8-day React for Designers! I'm confident that you are gonna learn something new after finishing the course.

Today let's learn about what this "React" thing really is, and why it's cool. Please read along: [http://www.learnreact.design/2017/06/08/what-is-react/](http://www.learnreact.design/2017/06/08/what-is-react/)

This article has been read by more than 10,000 people and I hope you like it too.

### Homework

Make sure that you can answer the questions in the "[Learning goals](http://www.learnreact.design/2017/06/08/what-is-react/#learning-goals)" section. 

--- 

## Day 2/8: Components, props and state
React is all about components. Today let's learn about components and their "props". State is what makes our React app interactive. However, many people find state and props confusing when they get started.

Watch this 5-minute video and come back to answer the question in the Homework section: [https://youtu.be/Lr545N_mshY](https://youtu.be/Lr545N_mshY)

In this video, I talked about what state is and how it's different from props: [https://youtu.be/JSMHIF_3LII](https://youtu.be/JSMHIF_3LII)


### Homework

- Do you remember Domo's hat in yesterday's lesson? (screenshot below). Try to write the simple notation for Domo's hat as I wrote in the video. What props could the components have? 

<p data-height="375" data-theme-id="light" data-slug-hash="gROrXx" data-default-tab="result" data-user="focuser" data-embed-version="2" data-pen-title="Reactive UI" class="codepen">See the Pen <a href="https://codepen.io/focuser/pen/gROrXx/">Reactive UI</a> by focuser (<a href="https://codepen.io/focuser">@focuser</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

- Can you add the state in the simple notation you wrote above?
- [Tweet your progress](https://twitter.com/home?status=Day%202/8%3A%20Just%20learned%20what%20%23React%20components%20and%20props%20are!%208-day%20%23React%20course%20by%20%40lintonye%20http%3A//learnreact.design/react-mini/). Now you know what React components and props are! 

--- 

## Day 3/8: Build the House component in JavaScript

Today let's build some real stuff! We'll write some real JavaScript code that draws a house for us. Watch this video and come back for homework: [https://youtu.be/h1Hr_EslNfA](https://youtu.be/h1Hr_EslNfA)

### Homework
- Open and remix this project: [https://glitch.com/edit/#!/react-house-0](https://glitch.com/edit/#!/react-house-0)
- Add wall, window and door to the house
- How can you display two houses?
- 🙌 You just wrote some real React code! [Tweet your progress](https://twitter.com/home?status=Day%204/8%3A%20Join%20me!%20I%27m%20coding%20%23React%20components%20in%20JS%20now!%20http%3A//learnreact.design/react-mini/%20by%20%40lintonye) and treat yourself some yummy 🍩🍪 !
- TODO capitalize or not

--- 

## Day 4/8: Smiley faces in components - JSX and arrow functions
Now that you've wrote some code in JavaScript. It isn't that difficult, right?

Remember the smiley faces when defining a React component? Watch the videos below to find out what those symbols really are: 

- [ES6 constant and arrow functions](TODO)
- [JSX](https://youtu.be/5WRlEZwxdKM)

### Homework
- What is the result of the following code?
{% highlight jsx %}
var name = 'Tom';
const age = 20;
if (name === 'Tom') {
  age = 25;
}
{% endhighlight %}

If you are not sure, paste the code in Chrome console and hit Enter key.

- Convert the functions below to arrow functions (be as concise as possible). Remix [this project](https://glitch.com/edit/#!/es6-playground?path=src/index.js:1:0) and play with the code in Glitch.

{% highlight jsx %}
function pi() {
  return 3.14159;
}

function square(n) {
  return n * n;
}

function add(a, b) {
  var result = a + b;
  return result;
}

const yawn = function() {
  console.log('yawn.');
  console.log('yawn...');
  console.log('zzzzzzZZZ');
}

console.log('pi = '+ pi());
console.log('square 4 = ' + square(4));
console.log('add(4, 5) = ' + add(4, 5));
console.log(yawn());
{% endhighlight %}

- What is the output of the code below? What if we uncomment the last line?
{% highlight jsx %}
const fruit = () => '🍉';
const burger = () => '🍔';

const packLunch = (packMeal, packSnack) => [packMeal(), packSnack()];

console.log(packLunch(burger, fruit));
console.log(packLunch(() => '🌭', fruit));
// console.log(packLunch('🍕', fruit)); 

{% endhighlight %}

- What does the following code do?
{% highlight jsx %}
const Window = () => <div>Window</div>;
{% endhighlight %}


- What is JSX? Why do we need it?
- Don't forget to [tweet your progress](https://twitter.com/home?status=Day%206/8%3A%20Join%20me!%20I%27ve%20learned%20JSX%20and%20ES6%20arrow%20functions!%208-day%20%23React%20course%20by%20%40lintonye%20http%3A//learnreact.design/react-mini/)!

--- 

## Day TODO: More JSX

- JS Expression and JSX

### Homework
- Which of the following are expressions?
  - A. `true`
  - B. `""`
  - C. `<div>Window</div>`
  - D. `n => n * n`
- What does the following code do? Find all expressions in the code:
{% highlight jsx %}
const Lines = () => {
  let children = [];
  for (let i = 0; i < 10; i++) {
    children.push(<div>Line { i+1 }</div>); // Array.push adds a new element to the array
  }
  return (
    <div>
      { children }
    </div>
  )
}
{% endhighlight %}

---

## Day TODO: Styling components
- Import/export
- Style with CSS and inline style
- styled-components
- Comparing vanilia CSS and CSS-in-JS

### Homework

--- 

## Day 7/8: Blue roof, red roof - Props in JS
Today let's write some code to color the roof! Props are important concept in React and it turns out to be fairly straightforward. Props are just like HTML attributes!

Watch the videos below:

- [Intro to Objects](https://www.khanacademy.org/computing/computer-programming/programming/objects/p/intro-to-objects)
  - [Challenge: Recipe Card](https://www.khanacademy.org/computing/computer-programming/programming/objects/p/challenge-recipe-card)
- [Blue roof, red roof - Props in JS](https://youtu.be/y3gcx4H8g-0)

### Homework

- Remix this project: [https://glitch.com/edit/#!/react-house-3-6-props](https://glitch.com/edit/#!/react-house-3-6-props)
- In App.js, make the house number on the wall configurable
- Can you make two houses with different roof colors and house numbers?
{% highlight jsx %}
const App = () => (
  <div>
    <House roofColor='blue' number='123'/>
    <House roofColor='red' number='321' />
  </div>
);
{% endhighlight %}
- Don't forget to [tweet your progress](https://twitter.com/home?status=Day%207/8%3A%20I%27ve%20just%20coded%20some%20React%20props!%208-day%20%23React%20course%20by%20%40lintonye%20http%3A//learnreact.design/react-mini/)!

--- 

## ES6 Class

TODO content

### Homework
- Convert the following JSX code into JavaScript code (try them in your editor):
{% highlight jsx %}
/* 
 Hint: 
  <MyComp prop1="a" prop2="b">
    <div>Hello</div>
    <Child2 />
  </MyComp>

  ==>

  React.createElement(MyComp, 
    {prop1: 'a', prop2: 'b'}, 
    React.createElement('div', {}, 'Hello'),
    React.createElement(Child2, {}, null)
  );
*/

// 1
const House = ({roofColor}) => 
  <div>
    <Roof color={roofColor} />
    <Window />
  </div>;

// 2
const Roof = () => 
  <div>
    <span>Roof</span>
    This is Roof!
  </div>;

// 3
const houses = [
    <House roofColor="blue"/>, 
    <House roofColor="red" />
];

{% endhighlight %}

- Which of the following are valid components?
{% highlight html %}
// (A)
const HouseA = <div>House</div>;

// (B)
const HouseB = <div />;

// (C)
const HouseC = () => <div><Roof><Window></div>;

// (D)
const HouseD = () => <div>House</div>;

// (E)
const HouseE = () => (
  <Roof />
  <Window />
);

// (F)
const houseF = () => 
  <div>
    <Roof />
    <Window />
  </div>;

{% endhighlight %}


- Which of the following are true about ES6 classes?
  - (A) By convention, the name of a class starts with a capital letter.
  - (B) Class is a new feature in ES6.
  - (C) A class can be used in the same way as an object.
  - (D) Class can be used to style an HTML element.
- Suppose we have a class named `Fruit`, how to create an object from it?
  - (A) `const fruit = Fruit('🍑')`
  - (B) `const fruit = Fruit 🥝`
  - (C) `const fruit = new Fruit('🍇')`
  - (D) `const fruit = Fruit.create('🍉')`
- Which of the following are true about methods?
  - (A) A method is defined in a class.
  - (B) A method cannot have any parameters.
  - (C) `this` can be used inside a method to refer to the current object.
  - (D) A method must include a `return` statement.
  - (E) A method can invoke another method defined in the same class with the `this` keyword. For example, `this.anotherMethod();`.
- Why does the name of a class start with a capital letter?
- Complete the "TODO" item in the code below:
{% highlight jsx %}
// TODO: define class Parrot here

const brad = new Parrot('Brad');
brad.say();
{% endhighlight %}
- In the code above, how can you simplify the definition of `Parrot` if you have a `Pet` class:
{% highlight jsx %}
class Pet {
  constructor(name) {
    this.name = name;
  }
  say() { console.log(this.name + ': Hello!'); }
}
{% endhighlight %}

- Complete the "TODO" items in the code below so that it prints the following in the console:
{% highlight html %}
Brad: chirp, chirp!
Bella: woooooof
{% endhighlight %}

{% highlight jsx %}
class Pet {
  constructor(name) {
    this.name = name;
  }
  say() { 
    // TODO: insert the content of say method here
  }
}

// TODO: insert class Parrot here
// TODO: insert class Dog here

const brad = new Parrot('Brad');
const bella = new dog1('Bella');
brad.say();
bella.say();
{% endhighlight %}
--- 

## Class components

### Homework
- Which of the following are true about class components:
  - (A) A class component is defined as an ES6 class.
  - (B) Class components are stateful.
  - (C) To use a class component inside another component, we need to create an instance using the `new` keyword.
  - (D) Class components cannot have props.
  - (E) The state of a class component can be accessed within a method using `this.state`.
- What are the differences between class components and functional components?
  - (A) Class components are stateless, whereas functional components are stateful.
  - (B) The props of a class component can be accessed within a method using `this.props`; whereas the first parameter of a functional component is its props.
  - (C) For a class component, props can also be retrieved as the first parameter of the render method, e.g. `render(props)`.
  - (D) The state of a class component can change during its lifetime; whereas functional components don't have state.
- Convert the `Roof` component to a class component which properly handles the `color` prop.

--- 

## Day 8/8: Open Sesame! - State in JS

Wow time flies! This is the last day of our React course. I hope you find it useful so far!

Today let's make the door respond to user input: open or close the door when you click on it. There are about half hour of videos to watch plus the homework, so please reserve about an hour for today's learning.

Watch the videos below:

- [ES6 Class](https://youtu.be/l0ZmZc-4_Zg)
- [Class components](https://youtu.be/3Ymccxln9vQ)
- [Open Sesame! -- setState](https://youtu.be/_NQMTEHT3so)

### Homework
- Remix this project: [https://glitch.com/edit/#!/react-house-3-8-state](https://glitch.com/edit/#!/react-house-3-8-state)
- Make the window open/close when the user clicks on it
- Woo-hoo! Don't forget to [tweet](https://twitter.com/home?status=Day%208/8%3A%20I%27ve%20just%20learned%20React%20state!%208-day%20%23React%20course%20by%20%40lintonye%20http%3A//learnreact.design/react-mini/) that you've learned React state!

--- 

## Next Step
Congratulations! You've just learned the core ideas of React!🍻 🎉 🌈

Of course, to really use React in your projects, there are a lot more to learn. That's why I am building a comprehensive course, ***React Essentials For Designers***, to help you understand all things React and become a super designer!

Check out more details [here](http://www.learnreact.design/re4d-preorder/).

<!-- ![](/images/courses/re4d/finish_8_day_course.png) -->


