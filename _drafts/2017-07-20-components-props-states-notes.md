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
<div>
  <HatSwitcher />
  <Thinker />
</div>

HatSwitcher: ...

Thinker:
  <div>
    <DomoInPose />
    <Hat />
  </div>

DomoInPose:
  <img ... />

Hat:
  <img ... />

DomoInPose:
  <img src="https://..." />


<div>
  <HatSwitcher />
  <Thinker hat={hat}/>
</div>

ThinkerBody:
  <img ... />

Hat:
  cap
    <img src="cap.png" />
  pirate
    <img src="pirate.png" />
  ...

- props: animation frames

- prop: just like the prop in html tag, it's the configuration of a component


- house
  - components: roof, window, door
    - reusable!
  - props: properties that are fixed when the component is built, e.g. the color of roof, the shape of door
  - state:
    - AFTER the component is built, things that can change, e.g. we can open the door
    - state change is usually triggered by external events
    - the state of a component has nothing to do with its parent. I.e. (taking out the door by itself) whether the door is open or close has nothing to do with the house. And we can't tell if the door is open or close by only looking at the house -- we have to dig into the door
  - What if we want to know whether the door is open at the house level? I.e. to say if the house is warm or cold (door closed or open).
    - elevate the state of door to house: house's door is open, or closed
    - Question: should the status of door be a state or prop of the door?
      - if state, will conflict with state of the house
        - minimize states
      - if prop, how come it changes? Didn't you say that props can't change?
        - magic house, when the state of house changes, will rebuild the door with a new prop.
          - recreation is FAST!
  - Props: don't change AFTER it's built
  - State: can change AFTER it's built
  - One-way data flow
    - tree chart
  - TODO how to change state?
  - TODO why state is private but we use it to respond to external events?
  - TODO props are passed from parent




- house analogy
  - house style
  - roof color, door color etc.
  - why passing down props? why not direct access to parent's temperature?
    - can't test doors individually
  - instead of passing "burning, freezing, normal", can pass down temperature too
    - different burning point for different component of the house
  - door open state alternatives:
    - state on the door
    - house state: a opening on the wall

- ice / water analogy?
  - one value (temperature) changes many things:
    - form: solid, liquid, gas
    - volume
  - but isn't prop the same? seems still confusing

House:
  - Roof
  - Wall
  - Door
  - Window

=>
 <div>
  <Roof color='blue'/>
  <Wall />
  <Door />
  <Window />
 </div>

Door:
  <img src={`door-${state.status}.png`}/>  // => door-closed.png, door-open.png
  state:
    status:
  when clicked:
    if state.status is 'open'
      set state.status to 'closed'
    else
      set state.status to 'open'

===

House:
  <div>
    <Roof color='blue' />
    <Wall />
    <Door status={state.doorStatus} whenDoorClicked={whenDoorClicked}/>
    <Window />
  </div>
  state:
    doorStatus
  whenDoorClicked:
    if state.doorStatus is 'open'
      set state.doorStatus to 'closed'
    else
      set state.doorStatus to 'open'    

Door:
  <img src={`door-${props.status}.png`} />
  props:
    status
    whenDoorClicked
  when clicked
    run props.whenDoorClicked

- what are Components
- what are props
  - accessible via: `this.props`
  - read only
    - fixed throughout the lifetime of a component
      - the lifetime of a component is actually fairly short
  - Props are how components talk to each other.
  - props (short for properties) are a Component's configuration, its options if you may.
  - A Component cannot change its props, but it is responsible for putting together the props of its child Components.
  - A component can be recreated with new props in no time. User won't be able to tell if it's a state change or a prop change (via recreation of a new component)
- what are states?
  - it is private and fully controlled by the component
  - The state starts with a default value when a Component mounts and then suffers from mutations in time (mostly generated from user events). It's a serializable* representation of one point in time—a snapshot.
  - a component cannot access the state of its children
  - respond to user input, a server request or the passage of time. For this you use state.
  - Unlike properties, there’s no way to define what state should be applied to components via JSX…
  -  If a Component needs to alter one of its attributes at some point in time, that attribute should be part of its state, otherwise it should just be a prop for that Component.
  - is it a state? Minimize state
    - Is it passed in from a parent via props? If so, it probably isn't state.
    - Does it remain unchanged over time? If so, it probably isn't state.
    - Can you compute it based on any other state or props in your component? If so, it isn't state.
  - which component should hold the state?
    - This is often the most challenging part for newcomers to understand,
    - how to find where the state should live?
      - which components render according to the state?
      - find a common owner
      - the owner or its (grand)owner should hold the state
      - create a new component simply for holding the state if no common owner is found
- when to use props, when to use states?
- revisit Domo's hat
- Unidirectional dataflow?
- States are things that change -- but props change too?
- Try to keep as many of your components as possible stateless. By doing this you'll isolate the state to its most logical place and minimize redundancy, making it easier to reason about your application.

- Refs:
  - https://github.com/uberVU/react-guide/blob/master/props-vs-state.md
  - https://medium.com/react-tutorials/react-state-14a6d4f736f5

<a name="learning-goals">

# Learning Goals

<a name="endofpost">
