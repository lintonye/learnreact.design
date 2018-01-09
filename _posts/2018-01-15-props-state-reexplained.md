---
layout: post
last-modified: '2017-08-16'

title: "Props and State Re-explained"
subtitle: "React terms in plain English and doodles🌴🎄⚛"

excerpt: "React terms explained in plain English and doodles🌴🎄⚛"

author:
  name: Linton Ye
  twitter: lintonye
  bio: Freelance full-stack developer in BC Canada (GMT-8). Android, React Native, Node.js, MongoDB, PostgreSQL. <a href="mailto:linton@jimulabs.com">Contact me.</a>
  image: linton.jpg
---

_This series of posts will be the very first part of the ["React Essentials for Designers" course](http://learnreact.design/re4d/) I'm creating. [Sign up](http://learnreact.design/re4d/) now and receive exclusive updates!_

- _[What is React?](/2017/06/08/what-is-react/)_
- _[What is React Native?](/2017/06/20/what-is-react-native)_
- _React Native vs. Hybrids (coming soon)_
- _Components, Props and State (this post)_

---

House:
  <div>
    <Window />
    <Door />
    <Cat />
  </div>

Door:
  State: status // "open" or "closed"
  <div>{state.status} door</div>
  when the door is clicked
    if door.state.status is "open"
      change door.state.status to "closed"
    otherwise
      change door.state.status to "open"

Cat:
  State: status // "sleeping" or "awake"
  <div>{state.status} cat</div>

Attempt 1:

Door:
  State: status // "open" or "closed"
  <div>{state.status} door</div>
  when the door is clicked
    if state.status is "open"
      change state.status to "closed"
      change cat.state.status to "sleeping"     ---> WRONG
    otherwise
      change state.status to "open"
      change cat.state.status to "awake"        ---> WRONG

Attempt 2:

Cat:
  State: status // "sleeping" or "awake"
  <div>{state.status} cat</div>
  when the door is clicked                    ---> ???
    if door.state.status is "open"            ---> WRONG
      change cat.state.status to "sleeping"
    otherwise
      change cat.state.status to "awake"

Attempt 3:

key question: how to keep the status in sync --- want to keep the status of door and cat in sync. But can't do this inside either door or cat, because the states are inaccessible from another component.

keep the synccing goal in mind, and forget about anything else for now (e.g. how to change the state of door, cat etc.).

what if we look at door and cat at a higher level? In House, Door and Cat are side by side. Chances are that's the place where we can easily sync them up!


Forget about the definition of props and when to state for a minute.

House:
  <div>
    ...
    <Door status="open" />
    <Cat status="awake" />
  </div>
Door:
  <div>{props.status} door</div>
Cat:
  <div>{props.status} cat</div>

when the door is closed:
House:
  <div>
    ...
    <Door status="closed" />
    <Cat status="sleeping" />
  </div>

Now, say, the status of the door is not a fixed value but a changing variable "doorStatus"

House:
  <div>
    ...
    <Door status={doorStatus} />
    <Cat status={if doorStatus is 'open' then 'awake' otherwise 'sleeping'} />
  </div>

BTW: what's this changing value "doorStatus"? What's the thing that could change after the component is built? It's a state, right?

House:
  State: doorStatus
  <div>
    ...
    <Door status={state.doorStatus} />
    <Cat status={if state.doorStatus is 'open' then 'awake' otherwise 'sleeping'} />
  </div>

Now that we have *_elevated_* the state from the Door to the House -- basically moving the state upstream, and pass it down to the door.

Alright, but how do we change the value of state.doorStatus? 

TODO: how to say that it's not possible to say "when door is clicked" in House component?

House:
  State: doorStatus
  toggleDoorStatus:
    if state.doorStatus is "open"
      change state.doorStatus to "closed"
    otherwise
      change state.doorStatus to "open"
  <div>
    ...
    <Door status={state.doorStatus} onClickAction={toggleDoorStatus}/>
  </div>
Door
  ...
  when door is clicked
    run props.onClickAction  


----


Today let's study the three most important concepts in React: components, props and state, and the differences between props and state.

As in previous posts, I'll attempt to use plain English to explain the concepts. So, no JavaScript knowledge is required to read this post. 

In fact, you won't find any JavaScript code here at all. Instead, I'll use a simple notation [^1] to help you understand the main ideas first before diving into JavaScript (in future posts). I believe this spoon-feeding 🥄 approach is an effective way to learn React (or any technologies) especially if you don't have much programming experience -- mixing React concepts and JavaScript subtleties can be quite overwhelming!

<a name="learning-goals">

# Learning Goals
After reading this post, I'll get you to come back here. Hopefully you'll be able to answer these questions easily:

- What is a prop?
- What is state?
- When to use props and when to use state?
- How to make the window openable?
- Can you write the psedocode for [Domo's hat](/2017/06/08/what-is-react/#domo-hat)?

# Let's build a house
To understand what these concepts are and how to use them, let's build a simple example. What about a house? (Try clicking the door)

<p data-height="480" data-theme-id="light" data-slug-hash="EXBOpx" data-default-tab="result" data-user="focuser" data-embed-version="2" data-pen-title="React House" class="codepen">See the Pen <a href="https://codepen.io/focuser/pen/EXBOpx/">React House</a> by focuser (<a href="https://codepen.io/focuser">@focuser</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

# Components
If you remember what we've discussed in an [early post](/2017/06/08/what-is-react/), components are one of the three pillars of React. Building an app in React is almost all about working with components.

The very first step is to break down the UI into various components. For example, we can break down our house this way:

![house break down](/images/props-states/1-house-components.png)

Now let's code it!

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

So, in the code above, we have the `<div>` container which is pretty much the same as in HTML. Things like `Roof` and `Wall` are custom tags/components that we are going to define soon.

Remind you, the above isn't exactly real React code -- there's no JavaScript at all. For now, let me just use loose syntax and plain English to explain what's in there. Once you understand the ideas behind the scene, the next step is to learn the nitty gritty of JavaScript and convert the ideas into real code.

To make things easier to understand, I'll use another simplification: instead of using images as you saw at the beginning of this post, for now let's make a super simple web app that displays plain text for everything.

The roof is just a div with some plain text:

{% highlight jsx %}
Roof:

  <div>roof</div>
{% endhighlight %}

Other components are the same -- they are just plain text inside a HTML div. Let's look at the complete, React-ish code for our house:

{% highlight jsx %}
House:

  <div>
    <Roof />
    <Wall />
    <Window />
    <Door />
  </div>  


Roof:

  <div>roof</div>


Wall:

  <div>wall</div>


Window:

  <div>window</div>


Door:

  <div>door</div>

{% endhighlight %}

This is not hard to understand, right? House is made up of Roof, Wall, Window and Door, which are all made up of plain text.

In the end, React will generate HTML like this:

{% highlight html %}
<div>
  <div>roof</div>
  <div>wall</div>
  <div>windows</div>
  <div>door</div>
</div>
{% endhighlight %}


# Configure roof color with Props

Imagine that we send a sheet of specification to a factory where all the individual parts are built. In the specification, we can tell the factory about the intrinsic properities of the parts: the color of the roof, the shape of the door etc. After the roof and the door are built according to our request, those properties will stay the same. So the roof remains blue, and the door remains a rectangle. They won’t change at all.

In React, we call these properties _Props_ which is basically short for properties. Remember two things about props: first, we determine the value of a prop and use it as part of the blueprint BEFORE a component is built. Second, the value of a prop will never change.

So how does a prop look like in the code? In the House component, if we want our roof to be blue, we can simply add a prop “color” to the Roof tag. This is like specifying the color in the specification to be sent to the factory.

It looks very similiar to HTML tags where where you can add attributes:  

{% highlight jsx %}
House:
  <div>
    <Roof color="blue"/>
    ...
  </div>
{% endhighlight %}

How is the roof actually built? Let’s write the code for it.

{% highlight jsx %}
Roof:

  <div>{props.color} roof</div>
{% endhighlight %}

That's it? Right! There are a few things worth mentioning here:

- The HTML-ish code that defines a component is a **template**, not just a single HTML tag. This means we can put _placeholders_ in it to output variations of HTML content without repeating ourselves. (Remember [this picture of Domo's hat](/images/what-is-react/09-thinker-with-hat.png)? That's the idea of placeholders!) In this example, for `<Roof color="blue" />`, we'll get `<div>blue roof<div>`; for `<Roof color="red" />`, we'll get `<div>red roof</div>`, so on and so forth.
- The curly brackets used in the template tells React that we are gonna use a placeholder here, instead of plain content.
- `props` can be think of as a container of all the prop values set in the `Roof` tag. So suppose we have `<Roof color="blue" material="wood" />`, we can then use both `props.color` and `props.material` in the definition of the `Roof` component.

# Open the door with State
## Add state to a component
Another thing that a component can have is called _state_. What is a state? It’s something that can change AFTER a component is built.

For example, the door can be either open or closed. We say the status of the door is a state because its value can change even after the door is built. This is different from a prop like the shape of the door which does not change once the door is created.

The change of a state value is often caused by some external event. For a web app, it’s usually user input, or data from a server or the passage of time that’d change the state of a component.

Let's add the state to the door:

{% highlight jsx %}
Door:
  State:
    status   // "open" or "closed"
  <div>Door is {state.status}</div>
{% endhighlight %}

Very similar to `props`, `state` is a container of all the state values in the component. Therefore, we can use `state.[something]` inside the template in the component definition.

## Change the state on user input

Next, let's make the door interactive by adding some "code" that handles user input.

{% highlight jsx %}
Door:
  State:
    status   // "open" or "closed"
  <div>Door is {state.status}</div>
  // Handle user input
  when the door is pulled
    change state.status to "open"
  when the door is pushed
    change state.status to "closed"
{% endhighlight %}

The key thing here is that the state of a component changes from time to time. The output of the template, i.e. the generated HTML, changes accordingly and automatically.

BTW: Don't forget that the above isn't real React code. Don't copy and paste it into your project! Things will get ugly... 💣

## State is private

The state is private to a component. Whether the door is open or closed is only the door’s business. It has nothing to do with the house, or other components. In fact we can just take the door out of the house, it can still be open or closed on its own.

Therefore, the door's state is only visible inside the Door component. Within the Door component, we can only read or change its own state.

{% highlight html %}
House:
  <div>
    <Door />
    ...
    <!-- This is WRONG -->
    <div>The door is {Door.state.status}</div>
  </div>

Window:
  ...
  <!-- This is WRONG -->
  change Door.state.status to 'open'

Door:
  ...
  <!-- Man, this is WRONG too! -->
  if House.state.isForSale
    make the door openable by the realtor
{% endhighlight %}


# Conclusion
Here we go, that’s props and state. Props are configuration of a component whose values are determined before the component is created. Just like the shape of the door, or the color of the roof, props always stay the same. On the other hand, state is a component’s private data that’s available only after the component is created. Just like whether the door is open or closed, state changes from time to time. Usually it’s a response to user input, or something that happens on the server, or the passage of time.

But, but, we haven't built anything real, right? Plus, how useful is it to create an app that just displays plain text? I know, at least you want to see how to build the house that you see at the beginning of the post -- something colorful that you can click on, right?

Not surprisingly, that requires JavaScript coding which would make this post too long. I'll leave it to future posts. If you don't want to wait, sign up for [my free email course](/react-mini/) where things are taught in videos. The JavaScript fun starts at day 4!

---

# Footnotes:

[^1]: In techie terms, the notation that describes the main ideas but not real code is called *pseudocode*. It's not meant for computers to execute. It's a tool for us humans to formalize thoughts and communicate with others. Remember, pseudocode won't work on a computer, it's fairly [pseudo](https://encrypted.google.com/search?q=define:pseudo&hl=en).

<a name="endofpost">
