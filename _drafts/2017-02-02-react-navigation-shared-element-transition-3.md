---
layout: post
last-modified: '2017-01-25'

title: "React Navigation: Shared element transition 2/3: bounding boxes"
#subtitle: "A series of posts about creating custom transitions using NavigationExperimental."
#cover_image: "navigation-custom-transition/transit.jpg"

excerpt: "Blog series: creating custom transitions using NavigationExperimental. This post covers key challenges in the implementation."

author:
  name: Linton Ye
  twitter: lintonye
  bio: Freelance full-stack developer in BC Canada (GMT-8). Android, React Native, Node.js, MongoDB, PostgreSQL. <a href="mailto:linton@jimulabs.com">Contact me.</a>
  image: linton.jpg
---

*This is a series of posts about how to create custom transition "views" using the `Transitioner` in [React Navigation](https://reactnavigation.org/) (based on “NavigationExperiemental”):*

- *[An overview of Transitioner and CardStack](/2016/12/20/navigation-experimental-custom-transition-1.html)*
- *[Simple transitions: cross fade and Android default](/2016/12/22/navigation-experimental-custom-transition-2.html)*
- *[Shared element transition 1/3: overview](/2017/01/23/react-navigation-shared-element-transition-1.html)*
- *Shared element transition 2/3: bounding boxes (this post)*

---



### Recap: the challenges

To sum up the key challenges we've encountered so far:

1. In React, we don't have (and should not have) direct access to native widgets which provides the essential information (bounding boxes) we need to create the animation.
2. The mechanic to obtain layout metrics, i.e. `UIManager`, works asynchronously.



In order to obtain the bounding boxes of the native widgets, we'd have to be patient. We'd have to wait for the reconciliation step to finish. Fortunately `React.View` provides a `onLayout` prop to hook up some code at that point.

Further, we can use `UIManager.measureInWindow()` to

### Challenge 1: ReactElement is just a descriptor, not the actual UI widget
### Challenge 2: ReactElement hierarchy evaluation is lazy
### Challenge 3: Bounding box measuring is asynchronous

1. **No `getX()` or `getWidth()` etc.** The `ReactElement` object returned from `render` functions is just a descritor of how the view is supposed to be rendered, not the actual native view. Therefore there is no direct way to obtain information about the rendered native views in `render` functions. We'd have to use a helper class `UIManager`.
2. **`UIManager` works asynchronously.**

### Challenge 1: accessing views in other components
The shared views are defined in their respective scene components, which are rendered as children of our `SharedElementsTransitioner`. How can we get hold of them?

Easy! Just traverse the tree, right? This was my first attempt which turned out to be fruitless, due to the way how React works. More on this later.

### Challenge 2: identifying active shared views
In the photo grid, only one photo, the one that's just tapped, can be used to create animations. You certainly don't want all photos to zoom and move at the same time!

The challenge here is that in `SharedElementsTransitioner`, you can't directly traverse the tree to visit all the shared views in one place.

### Challenge 3: measuring view bounding boxes
can't do `this.getLeft()` or `this.getWidth()`

- render has to be pure function of state and props



## API
After some trials and errors, I arrived at the API below:


Shared views are identified by their `name` and `containerRouteName`. If two `SharedView`s  on different scenes have the same `name`, they are considered shared and the transitioner will create animations for them. The prop `containerRouteName` gives the transitioner additional instructions on how to create the animations.

No other code is needed.



Let's check out the code.

Question:

how do we obtain the position and size of the shared view?


## Details
## Key takeaways
## Revisiting the goals


(BACKGROUND STORY)
Initially I set this as a challenge to myself and wasn't sure if it's actually possible at all to create something in pure JavaScript that's half-decent. The end result isn't too bad. The animation runs reasonably smooth - around 40fps on my old Nexus 5. This might not be the only way to implement this. and there is plenty of room for improvement (see the end of this post). But I think the general points are useful to implement other transitions and other things. React way of implementing things that depend on the state of UI.


- render should be a pure function of state and props
- Use a unique name to pair up shared views
- Use UIManager to measure shared view in window
- UIManager must be called in onLayout
- Deal with the delay due to the fact that UIManager runs in native thread
- setState atomically
- Tips to develop animation: on real device, turn off JS Dev mode
- Android: elevation = shadow + z-index
- cloneElement: ReactElement is just a lightweight description of the view, it's OK to call render() to get it
- Magic box
  - Fake things in the overlay
  - real scenes are mostly hidden, and only visible when the animation is about to finish.
- TODOs
  - can we really share a view to create the Youtube like transition? (link to someone's issue indicating that it is currently not possible to do so)
  - perhaps link to React Fibre?
  - Back to grid: the attempt that causes flickering
  - performance issue when there are a lot of shared views
  - loss of frames (especially in the beginning)
  - more complex interpolation between shared view properties, such as font size, color.
  - iOS
  - discussion: when loading image in detail scene is slow
  - what if we add a toolbar on the photo detail?

  ====

  If you check out the source of `Transitioner`, you'll see the animation starts when the `Transitioner` receives a new prop:

  {% highlight jsx %}
  class Transitioner extends React.Component {
    ....
    componentWillReceiveProps(nextProps: Props): void {
      ....
      this._startTransition(nextProps, nextScenes, indexHasChanged);
    }
  }_
  {% endhighlight %}

  It's worth noting that the `position` and `progress` animated values will continue to change as long as the transitioner instance remains the same and has not yet received a new prop.

  The implication of this is that


  - skipped frames at the beginning
    - measuring is expensive
  - minimize the number of updates - log in componentDidUpdate to debug

  ## Conclusion
  TODO
  - what if a shared element is the parent of another shared element?
  - closing discussions

  <a name="endofpost">
