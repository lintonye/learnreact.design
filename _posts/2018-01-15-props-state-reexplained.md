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
- _[Components, Props and State](/2017/08/16/components-props-state/)_
- _Props and State Re-explained (this post)_

---

In the [last post](/2017/08/16/components-props-state/), we've covered components, props and state. 

The differences between props and state are fairly apparent, and it seems straightforward to determine when to use props and when to use state. For example, it's natural to see that the color of the roof is a prop since it's an intrinsic configuration of the Roof. On the other hand, the status of the door is an obvious candidate for state because it's easy to see the door being opened or closed after it is built. In this post, however, let's challenge this line of thinking!

Seriously?!? Yes, you'll see that things can be either prop or state. There is no set rule. I'll show you a more useful, practical way of thinking about props and state.

# Learning Goals
After reading this post, I'll get you to come back here. Hopefully you'll be able to answer these questions easily:

- What are the primary use cases for props? What about state?
- What does "elevating the state" mean? In what situation we need to elevate the state?

# New Guest
Did you notice the new guest around our house? Try clicking the door below!

<p data-height="452" data-theme-id="light" data-slug-hash="VydPEJ" data-default-tab="result" data-user="focuser" data-embed-version="2" data-pen-title="React House With Cat" class="codepen">See the Pen <a href="https://codepen.io/focuser/pen/VydPEJ/">React House With Cat</a> by focuser (<a href="https://codepen.io/focuser">@focuser</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

This is a sleepy cat -- she sleeps as long as the door is closed, and only stands up when the door is open. If you close the door, she falls back asleep right away.

# Implementing the Cat

Now let me ask you, how to implement this behavior? Let's give it a try!

Let's get started with the "code" below. Take a moment to read it through. (Again this is not real JavaScript code, but a simplified notation that helps you understand the concepts without being distracted by JS subtleties)

{% highlight jsx %}
House:
  <div>
    <Roof />
    <Wall />
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
{% endhighlight %}

There is an additional Cat tag in the House component. What does the Cat component look like? Let's define it.

The cat can be either sleeping or awake. This seems fairly similar to the status of the door. Perhaps we can use state to represent the status of the cat as well:

{% highlight jsx %}
Cat:
  State: status // "sleeping" or "awake"
  <div>{state.status} cat</div>
{% endhighlight %}

With this definition of the Cat, the implementation of its aforementioned behavior is all about syncing up the status of the door and that of the cat. You know, when the status of the door is "open", we want the status of the cat to be "awake", otherwise, the status of the cat should be "sleeping". 

Easy peasy? Let's see...

## Attempt 1

Since we already have code that toggles the door status according to the current status, why don't we change the cat status over there as well?

{% highlight jsx %}
Door:
  State: status // "open" or "closed"
  <div>{state.status} door</div>
  when the door is clicked
    if state.status is "open"
      change state.status to "closed"
      change cat.state.status to "sleeping"     //---> WRONG
    otherwise
      change state.status to "open"
      change cat.state.status to "awake"        //---> WRONG
{% endhighlight %}

Unfortunately, this won't work! Remember that state is a component's private data that's only accessible from within the component itself? Nobody else, whether it's a parent or sibling, could access a component's state. 

Here, we are trying to change the status of the cat from within the Door component. It will miserably fail (after converted to real JavaScript code of course).

## Attempt 2:

Hmm, how about changing the cat status from within the Cat component? That should work, right?

{% highlight jsx %}
Cat:
  State: status // "sleeping" or "awake"
  <div>{state.status} cat</div>
  when the door is clicked                    ---> ???
    if door.state.status is "open"            ---> WRONG
      change cat.state.status to "sleeping"
    otherwise
      change cat.state.status to "awake"
{% endhighlight %}

Yes, it's definitely fine to change cat status from within the Cat component. But we would need to read the status of the door to determine what the cat status should be. The status of the door is the state of Door component, and it's therefore not accessible from within the Cat component!

## The Solution
Errr! That's really lame. To keep the door status and the cat status in sync, we definitely need to access both of them somewhere. But it appears that the data is hidden one way or another, by design! How to solve this dilemma?

The solution requires us to flex our understanding of the use cases of state and props.

### Elevating Door State
If we look at the House component:

{% highlight jsx %}
House:
  <div>
    ...
    <Door />
    <Cat />
  </div>
{% endhighlight %}

Here, Door and Cat are side by side. Perhaps that's the place where we can easily sync them up?

However, we are now inside the House component. For the same reason as our last attempts, it's impossible to either read the state of Door or change the state of Cat here. 

But what if we use props instead of state? 

{% highlight jsx %}
House:
  <div>
    ...
    <Door status="open" />
    <Cat status="awake" />
  </div>
{% endhighlight %}

When the door is closed, it'd be:
{% highlight jsx %}
House:
  <div>
    ...
    <Door status="closed" />
    <Cat status="sleeping" />
  </div>
{% endhighlight %}

Of course the status of the door can't be a fixed value. It changes from time to time. Let's denote it with "doorStatus".

{% highlight jsx %}
House:
  <div>
    ...
    <Door status={doorStatus} />
    <Cat status={if doorStatus is 'open' then 'awake' otherwise 'sleeping'} />
  </div>
{% endhighlight %}

Didn't that solve the synchronization problem? By the way, what's this changing value "doorStatus"? What's the thing of a component that could change? It's state, right?

{% highlight jsx %}
House:
  State: doorStatus // 'open' or 'closed'
  <div>
    ...
    <Door status={state.doorStatus} />
    <Cat status={if state.doorStatus is 'open' then 'awake' otherwise 'sleeping'} />
  </div>
{% endhighlight %}

Bravo! This House component looks fairly well-defined and the statuses of the door and the cat are now perfectly synced up.

We also need to change the definition of Door and Cat a bit to use props instead of state:

{% highlight jsx %}
Door:
  <div>{props.status} door</div>
Cat:
  <div>{props.status} cat</div>  
{% endhighlight %}

As you’ve seen, because we want to use the state of a component from its parent, in this case, using Door’s state from within House in order to set the status of the cat, we can represent the same data as the state of the parent and pass the data down to the child as props. This is often called **_elevating the state_**. We are moving the state up in the hierarchy.

![remote control](/images/props-state-reexplained/elevate-state.gif)

### Changing House State
Now that the statuses of the door and the cat are both linked to the state of the house. If we want to open the door or wake up the cat, we'd need to change the state of House. 

Question, what is the only place where we could update the state of House? From within House, right?

However, we still want to trigger this change from Door. That is, we want the door to open only when the door is clicked, not the entire house, or window etc.

So the Door component needs to be something like this:

{% highlight jsx %}
Door:
  <div>{props.status} door</div>
  when door is clicked
    do something to change the state of the House
{% endhighlight %}

But wait a second, didn't we say that it was impossible to change the state of House from within the Door component? 

That is right. We cannot _directly_ change the state of House here. However, nothing prevents us from doing this _indirectly_. See this...

In the House component, let's write some code to actually change its own state:

{% highlight jsx %}
House:
  State: doorStatus // 'open' or 'closed'
  toggleDoorStatus:
    if state.doorStatus is 'open'
      change state.doorStatus to 'closed'
    otherwise
      change state.doorStatus to 'open'
  ...
{% endhighlight %}

At this point, we haven't specified _when_ to run this piece of code. We just assign it a name ("toggleDoorStatus") so that we can pick it by name and run it later.

And then we pass down the name to Door as a prop
{% highlight jsx %}
House:
  ...
  <div>
    ...
    <Door ... onClickAction={toggleDoorStatus} />
    ...
  </div>
{% endhighlight %}

In the Door component, we just run this action:

{% highlight jsx %}
Door:
  <div>{props.status} door</div>
  when door is clicked
    run props.onClickAction // this runs the code named "toggleDoorStatus"
{% endhighlight %}

This is much like passing the remote control of your TV to someone else. That person presses a button in the Door component. The TV in the House component changes channel or increases its volume. 

What's going to be performed depends on what kind of remote control is passed into Door. It could control a TV, an air conditioner or a HiFi audio system in House. In the Door component, all that person does is to press the button.

![remote control](/images/props-state-reexplained/remote-control.gif)

That's all we need! Here's the full "code":

{% highlight jsx %}
House:
  State: doorStatus // 'open' or 'closed'
  toggleDoorStatus:
    if state.doorStatus is 'open'
      change state.doorStatus to 'closed'
    otherwise
      change state.doorStatus to 'open'
  <div>
    ...
    <Door status={state.doorStatus} onClickAction={toggleDoorStatus} />
    <Cat status={if state.doorStatus is 'open' then 'awake' otherwise 'sleeping'} />
  </div>
Door:
  <div>{props.status} door</div>
  when door is clicked
    run props.onClickAction
Cat:
  <div>{props.status} cat</div>  
{% endhighlight %}

# Props vs State, Again
Now let’s revisit a couple of questions, what are the differences between props and states? When should we use state, when should we use props?

## When to use state, when to use props?
If you remember, I said props are intrinsic properties of a component that don’t change, and state is something that can change after a component is built. This helps when you first learn about the concepts. 

However, the example we’ve just built makes it confusing. Whether a door is open or whether a cat is sleeping definitely seem to be good candidates for state, but we used props to represent them. How so?

It turns out that there’s a lot of flexibility for choosing between state and props. Depending on how you see it, you can find different ways to model your components. For example you can say the state of the door is that it’s open, or the state of the house is that its door is open.

## A more useful way to understand
Confused? Here’s a more useful way of thinking about the question:

- State: The UI needs to change => there should be a state somewhere.
- Props: Use them to pass data & pass control

If there is something changed in the UI when the app is running, there’s gotta be a state. If you see the door open and close when you click on it. There’s gotta be a state somewhere.

However, the state does not necessarily need to live right on the updated component. It might be somewhere upstream. It all depends on where and how we need to use the information. For example, we decided to elevate the status of the door from Door component to House component, because we need to use it in the House component.

On the other hand, props are just something that can be used to pass data downwards in the hierarchy. Just like what we did to pass the value of state isDoorOpen down to the Door component. 

Props can also be used to pass down control. For example, we passed the event handler from House to Door.

## But do the props change value in this case?
No, they never do and never will. I know, the door opens and closes, and the cat sleeps and wakes up. Since we now use props to represent these, it's really tempting to think that props behave just like state -- their values change, right?

This is just an illusion, which I find fairly comparable to flipbook animations.

![flipbook](/images/props-state-reexplained/flipbook.jpg)

Every time when the state of the house changes, the old cat is removed and a brand new cat with new status is created from scratch. But this process happens really quickly, which gives us an illusion that there is only one cat that falls asleep and wakes up.

The sketches on any page in the flipbook never move. Similarly, the cats stay awake/asleep throughout their (short) lifespan.

# Conclusion

Alright, we've studied props and state again with a more complex example. In this example, we'd have to keep the statuses of the door and the cat in sync, while the door should still open or close when clicked.

Because state is private, we decided to *elevate* the door status from the state of Door component to the state of House component. This way, we can use this data in House component to set the statuses of the door and the cat. We pass down this data to Door and Cat as props so that they can display correct images according to the door status.

The other requirement is to trigger state changes when the door is clicked. Because the door status is now a state private to House, from within Door we can only make the change _indirectly_. In House, we write the code that actually changes the state, and pass its name down to Door. This is like passing around the remove control of a TV.

The example in this post may make things a bit confusing. Here's a practical way of thinking about state and props:

- State: The UI needs to change => there should be a state somewhere.
- Props: Use them to pass down data & control

How do you like it so far? Feel free to leave your comments and questions below!

---

<a name="endofpost">
