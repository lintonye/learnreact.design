---
layout: post
last-modified: '2017-06-20'

title: "Components, props, states"
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
- _What is React Native? (/2017/06/20/what-is-react-native)_
- _React Native vs. Hybrids (coming soon)_
- _Components, props, state etc. (this post)_

---

Components, props and state are important concepts in React.

Without JavaScript.

<a name="learning-goals">

# Learning Goals

# Let's build a house
To understand what these concepts are and how to use them, let's build a simple example. What about a house? (Try clicking the door)

<p data-height="365" data-theme-id="light" data-slug-hash="EXBOpx" data-default-tab="result" data-user="focuser" data-embed-version="2" data-pen-title="React House" class="codepen">See the Pen <a href="https://codepen.io/focuser/pen/EXBOpx/">React House</a> by focuser (<a href="https://codepen.io/focuser">@focuser</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

# Components
If you remember what we've discussed in an [early post](TODO), components are one of the three pillars of React. Building an app in React is almost all about working with components.

The very first step is to break down the UI into various components. For example, we can break down our house this way:

![house break down](/images/props-states/1-house-components.png)

Now let's code it in React!

{% highlight jsx %}
House:

  <div>
    <Roof />
    <Wall />
    <Window />
    <Door />
  </div>
{% endhighlight %}

Wait a second, isn't that some sort of HTML? That's right! Some parts of React code look very similar to HTML, and that, by design, is to make it easy for web designers to understand and write the code. How nice is that!

So, in the code above, we have the `<div>` container which is exactly the same as in HTML. Things like `Roof` and `Wall` are custom tags/components that we are going to define soon.

Of course, the above isn't exactly real React code -- there's no JavaScript at all. For now, let me just use loose syntax and plain English to explain what's in there ^1. Once you understand the ideas behind the scene, the next step is to learn the nitty gritty of JavaScript and convert the ideas into real code. I think this approach makes learning programming easier in general: ideas first, details later. TODO in my experience

Let's now build the Roof:

{% highlight jsx %}
Roof:

  <img src='http://i.imgur.com/ylhqgpN.png' />
{% endhighlight %}

There's really nothing fancy here. Our roof is just an image. As `div`, the tag `<img>` is exactly the same as in HTML. Other components are the same -- they are just different images.

Let's look at the complete, React-ish code for our house:

{% highlight jsx %}
House:

  <div>
    <Roof />
    <Wall />
    <Window />
    <Door />
  </div>  


Roof:

  <img src='http://i.imgur.com/ylhqgpN.png' />


Wall:

  <img src='http://i.imgur.com/ylhqgpN.png' />


Window:

  <img src='http://i.imgur.com/ylhqgpN.png' />


Door:

  <img src='http://i.imgur.com/ylhqgpN.png' />

{% endhighlight %}

This is not hard to understand, right? House is made up of Roof, Wall, Window and Door, which are all made up of images (`img`).

In the end, the code above will generate HTML like this:

{% highlight html %}
<div>
  <img src='http://i.imgur.com/ylhqgpN.png' /> <!-- roof -->
  <img src='http://i.imgur.com/ylhqgpN.png' /> <!-- wall -->
  <img src='http://i.imgur.com/ylhqgpN.png' /> <!-- window -->
  <img src='http://i.imgur.com/ylhqgpN.png' /> <!-- door -->
</div>
{% endhighlight %}

Of course, that's just a very boring house -- the whole thing is a bunch of static images and you can't do anything about it except staring at it. **However**, this is an important step that we should start with when building any app with React: always start with static components, add data and interactivity later. TODO perhaps more explanation

With that said, bear with me, we are gonna add more interesting stuff soon.

# Props






In React, a component can have props, short for _properties_. Props are basically configuration of a component that determine the , for example, the color of the roof, the shape of the door etc.

In HTML, we very naturally

question: what are `div` and `img` in the React code? They are components too! `src` is the prop of `img`.

# State

# Conclusion

# Footnotes
[^1] It's called pseudo code.

<a name="endofpost">
