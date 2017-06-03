---
layout: post
last-modified: '2017-01-27'

title: "React Navigation: Shared element transition 2/3 (bounding boxes)"
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
- *[Shared element transition 3/3: the animation](/2017/04/22/react-navigation-shared-element-transition-3.html)*

---

In the [last post](/2017/01/23/react-navigation-shared-element-transition-1.html), we've discussed some general ideas about how to create custom transitions like this:

<video controls autoplay>
  <source src="/images/navigation-custom-transition/shared-elements-trimmed-480p.mov" type="video/mp4">
  <!-- <source src="movie.ogg" type="video/ogg"> -->
  Your browser does not support the video tag.
</video>

In this post, let's start tackling the core problem: how to animate the shared views. Sections below discuss the key challenges I've encountered and [my solution](#solution) to them. While they arose when making a specific transition, I believe they'll be useful in many other things because we needed to dive deeper into how React works.

## Key challenges
Most of the magic happens on the overlay, and our overlay is rendered like so:

{% highlight jsx %}
 // class SharedElementsTransitioner
 _renderOverlay(....) {
   const sharedViews = this.cloneAndAnimateSharedViews(....);
   ....
   return (
     <Animated.View style={overlayStyle}>
       {sharedViews}
     </Animated.View>     
   );
 }_
{% endhighlight %}

Now here comes the question: What is this `cloneAndAnimateSharedViews` function supposed to look like?

Conceptually, we can just find all the shared views in the current and upcoming scenes, pair them up, retrieve their bounding boxes, clone them and create animated styles.

Let's give it a try:

{% highlight jsx %}
// class SharedElementsTransitioner
cloneAndAnimateSharedViews(transitionProps, prevTransitionProps) {
  const shareViewPairs = this.collectActiveSharedViewPairs(transitionProps, prevTransitionProps);
  return sharedViewPairs.map(pair => {
    // Does this getBoundingBox() really work?
    const bboxFrom = this.getBoundingBox(pair.fromItem);
    const bboxTo = this.getBoundingBox(pair.toItem);
    const animatedStyle = this.createAnimatedStyle(bboxFrom, bboxTo);
    const cloned = React.cloneElement(pair.fromItem);
    return (
      <Animated.View style={animatedStyle}>
        {cloned}
      </Animated.View>
    );
  });
}

collectActiveSharedViewPairs(transitionProps, prevTransitionProps) {
  //TODO
}

getBoundingBox(sharedView) {
  //TODO
}
{% endhighlight %}

Now how do we implement the missing methods?

- **`collectActiveSharedViewPairs()`**: Shared views are scattered all over the place - they are defined in their corresponding scene components which are rendered as children of our transitioner. How do we visit these views? Is it easy to traverse the tree?
- **`getBoundingBox()`**: Even if we can collect all the shared views, how do we get their bounding boxes? Is it as straightforward as in other UI frameworks, such as native Android?

To answer these questions, let's go a bit deeper on how React works.

### React rendering process
It's useful to view what's happening in React as a two-step process:

1. First, React creates a "virtual tree" that represents the native view hierarchy (which is more famously known as "virtual DOM" in ReactJS). The nodes on this tree, called React elements, are just descriptors -- they are plain objects with no references to the native widgets whatsoever. This step is where we, as React developers, can construct and update the user interface: we create React elements to describe what we want, typically in `render` methods of components.
2. Then, React feeds these descriptors into a "reconciliation" step when the native widgets are actually created and/or updated. React handles this process internally and transparently. We have no direct access of this process (and this is where React shines as it hides the complexities of the target UI platform).

When our `collectAndAnimateSharedViews` is called, we are at the first step above. So what we can visit is a tree of React elements.

This unique process creates some challenges when implementing the two aforementioned methods:

-------
- `collectActiveSharedViewPairs()`:
  - Challenge 1: React element trees are shallow.
- `getBoundingBox()`:
  - Challenge 2: No direct access to native widgets.
  - Challenge 3: Layout information only comes AFTER the virtual tree creation step.

-------

Let me expand on them next.

### Challenge 1: React element trees are shallow.
This one hit me when I attempted to traverse the React element tree the same way as in other UI frameworks. I had the (wrong) intuition that the React element tree must have all nodes fully expanded and ready to be visited, something like this:

{% highlight text %}
- View
  - Transitioner
    - PhotoGrid
      - ListView
        - SharedView
          - Image
          ...
    - PhotoDetail
      - SharedView
        - Image
      ...
{% endhighlight %}

The reality is different. Although a React element has a `children` prop, it only goes as far as it is declared, not all the way down to all leaves.

For example, say we have a React element:

{% highlight jsx %}
return (
  <View>
    <Transitioner .../>
  </View>
);
{% endhighlight %}

If we try to traverse it only via `props.children`, we'll get this:

{% highlight jsx %}
- View
  - Transitioner
{% endhighlight %}

If we want to know what's inside the `Transitioner`, we'd have to instantiate `Transitioner` and call its `render` method (or if it's a stateless component defined by a function, we'd call the function). I think that's pretty much what React does at the "reconciliation" stage.

Back to the `collectActiveSharedViewPairs` function that we were trying to write. All we wanted to do here is to collect shared views in the hierarchy. Doing it via tree traversal is possible, but it sounds wasteful if we have to redo what React is already doing.

BTW: I haven't yet found much about this traversal business. If you know a good resource, or want me to write more about it, say so in the [comments](#endofpost)!

### Challenge 2: No direct access to native widgets
In other UI frameworks, such as native Android, we could easily obtain layout information, such as bounding boxes, by calling a few methods on the view object. But this does not work in React Native because we don't have direct access to native widgets.

To understand this, let's go a bit deeper on how React works. It's useful to view what's happening in React as a two-step process:

1. First, React creates a "virtual tree" that represents the native view hierarchy (which is more famously known as "virtual DOM" in ReactJS). The nodes on this tree, called React elements, are just descriptors -- they are plain objects with no references to the native widgets whatsoever. This step is where we, as React developers, can construct and update the user interface: we create React elements to describe what we want, typically in `render` methods of components.
2. Then, React takes these descriptors and runs a "reconciliation" step that actually creates and/or updates the native widgets. React handles this process internally and transparently. We have no direct access of this process (and this is where React shines).

When our `collectAndAnimateSharedViews` is called, we are at the first step above and therefore only have access to React elements. React elements are plain objects and do not have a `getBoundingBox` method or anything remotely related!

To learn more about how React works, I recommend [this post](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html) by Dan Abramov.

### Challenge 3: Layout information only comes AFTER the virtual tree creation step

Why couldn't we have this much needed `getBoundingBox` method on React elements?

This is by design. Layout information, such as bounding boxes, is only available when a native widget gets laid out on the screen. However, when we are at the step 1 of the React rendering process, the corresponding native widgets may have not been laid out or even created yet!

This is why our first attempt of `cloneAndAnimateSharedViews` won't work!

<a name='solution'>

## My solution
So what else are on the table? Here's my approach in a nutshell:

- **"Register" shared views on mount:** Instead of redoing the traversal, we register shared views after they are mounted.
- **UIManager:** We'll wait until the views are laid out before trying to obtain their layout information. Using the `onLayout` props, we call `UIManager` to measure bounding boxes at the right time.

Along the way, we store information such as shared views and bounding boxes as the state of `SharedElementsTransitioner`. This allows us to code in the familiar React paradigm and enable us to take advantage of things like `shouldComponentUpdate` to improve the performance of animations.

Next let's check out the code!

### API
Here's how a user can mark an element as shared in the component's `render` method:

{% highlight jsx %}
// on photo grid screen
<SharedView name='photo1' containerRouteName='PhotoGrid'>
  <Image source={image} />
</SharedView>

// on photo detail screen
<SharedView name='photo1' containerRouteName='PhotoDetail'>
  <Image source={image} />
</SharedView>
{% endhighlight %}

- `name`: a name unique across the scene for pairing up the shared views on different scenes.
- `containerRouteName`: allows us to determine whether a shared view is on the "from" scene or "to" scene.

### "Register" shared views on mount
This is how our `SharedView` looks like. Just take a quick glance and I'll explain after the code block.

{% highlight jsx%}
class SharedView extends Component {
  static contextTypes = {
    registerSharedView: React.PropTypes.func,
    unregisterSharedView: React.PropTypes.func,
  };
  componentDidMount() {
    const { registerSharedView } = this.context;
    if (!registerSharedView) return;

    const { name, containerRouteName } = this.props;
    ....
    registerSharedView(new SharedItem(
      name,
      containerRouteName,
      this.render(),
      nativeHandle,
    ));
  }

  componentWillUnmount() {
    const { unregisterSharedView } = this.context;
    if (!unregisterSharedView) return;

    const { name, containerRouteName } = this.props;
    unregisterSharedView(name, containerRouteName);
  }
}
{% endhighlight %}

#### Define register/unregister functions in `context`

To save us from the trouble of traversing the tree, we just piggyback on React's internal traversal -- when the shared views are mounted, save it somewhere for later use.

I chose to save the shared views as the state of the `SharedElementsTransitioner`. I also used `context` to save me from having to pass the register/unregister function all over the place. (To learn more about `context`s, read [this](https://facebook.github.io/react/docs/context.html))

So in `SharedElementsTransitioner`, its child context is defined like so:

{% highlight jsx %}
class MaterialSharedElementTransitioner extends Component {
  ....
  static childContextTypes = {
    registerSharedView: React.PropTypes.func,
    unregisterSharedView: React.PropTypes.func,
  }
  getChildContext() {
    const self = this;
    return {
      registerSharedView(sharedItem: SharedItem) {
        ....
      },
      unregisterSharedView(name: string, containerRouteName: string) {
        ....
      },
    };
  }    
}
{% endhighlight %}

#### `itemsToMeasure`

In `registerSharedView`, in addition to saving the shared item to a collection, we also maintain an `itemsToMeasure` for convenience. This way we'll know which shared views are "active" and require the bounding box information to create the animation.

The implementation of `registerSharedView` look like this:

{% highlight jsx %}
// class SharedElementsTransitioner
registerSharedView(sharedItem: SharedItem) {
  self.addSharedItem(sharedItem);
  const {name, containerRouteName} = sharedItem;

  const matchingItem = self.state.sharedItems.findMatchByName(name, containerRouteName);
  // schedule to measure (on layout) if another view with the same name is mounted
  if (matchingItem) {
    self.setState((prevState:State) => ({
      sharedItems: prevState.sharedItems,
      itemsToMeasure: [...prevState.itemsToMeasure, sharedItem, matchingItem]
    }));
  }
}
{% endhighlight %}

BTW: We are using [the atomic flavor](https://facebook.github.io/react/docs/react-component.html#setstate) of `setState` since the new state depends on the previous state.

### Get bounding boxes with `UIManager`

If we do some googling, we'll find that `UIManager.measureInWindow()` is the actual function that we can rely on to get the much needed bounding boxes.

There are a few special things about this function that we need to cope with:

1. It only works after the view is laid out.
2. It works asynchronously.
3. It requires a "native handle" of the view.
4. On Android, it'll return `undefined` if a view is "collapsed", an optimization done by React Native.

Let's address them one by one:

#### 1. It only works after the view is laid out.
We'll just have to call the function at the right time, using the `onLayout` prop of `React.View`. Note, only `React.View` has this prop, so we must wrap the `Transitioner` with a `View`.

{% highlight jsx %}
// class SharedElementsTransitioner
render() {
  return (
    <View onLayout={this._onLayout.bind(this)}>
      <Transitioner
        ....
          />
    </View>
  );
  _onLayout() {
    // call UIManager here
  }
}_
{% endhighlight %}

**Update (2017-02-03):** This only works on Android. On iOS, the `onLayout` function isn't called during transition. This is perhaps more accurate behavior since the layout of the root view does not change during transition. I had to use the `onLayout` on each scene instead:

{% highlight jsx %}
_renderScene(transitionProps) {
  ....
  return (
    <Animated.View ....
        onLayout={this._onLayout.bind(this)}>
        <Scene navigation={navigation} />
        ....
    </Animated.View>
  );
}_
{% endhighlight %}

#### 2. It works asynchronously.

The function `UIManager.measureInWindow` returns the result in a callback:

{% highlight js %}
UIManager.measureInWindow(
    viewNativeHandle,
    (x, y, width, height) => {
      // do something about x, y, width and height
    }
)
{% endhighlight %}

Using the awesome [`async` function in ES7](https://jakearchibald.com/2014/es7-async-functions/), we can write the function in a synchronous fashion. We can also make sure that we only call `setState` once until all items are measured:

{% highlight jsx %}
// class SharedElementsTransitioner
measure(sharedItem: SharedItem): Promise<Metrics> {
  return new Promise((resolve, reject) => {
    UIManager.measureInWindow(
      sharedItem.nativeHandle,
      (x, y, width, height) => {
        resolve({ x, y, width, height });
      }
    );
  });
}

async _onLayout() {
  let toUpdate = [];
  // Measure them one by one
  for (let item of this.state.itemsToMeasure) {
    const { name, containerRouteName } = item;
    const metrics = await this.measure(item);
    toUpdate.push({ name, containerRouteName, metrics });
  }
  // Update the state when all metrics are ready
  if (toUpdate.length > 0) {
    this.setState((prevState: State): State => ({
      sharedItems: prevState.sharedItems.updateMetrics(toUpdate),
      itemsToMeasure: [],
    }));
  }
}_
{% endhighlight %}

#### 3. It requires a “native handle” of the view.
When registering a shared view, we retrieve its [instance](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html) using the [`ref` prop](https://facebook.github.io/react/docs/refs-and-the-dom.html), and use `findNodeHandle` to get the native handle, like so:

{% highlight jsx %}
import { findNodeHandle } from 'react-native';
class SharedView extends Component {
  ....
  render() {
    return (
      <View ....
        ref={c => this._view = c}>
        {this.props.children}
      </View>
    )
  }
  componentDidMount() {
    ....
    const nativeHandle = findNodeHandle(this._view);
    registerSharedView(new SharedItem(
      ....
      nativeHandle,
    ));
  }
}_
{% endhighlight %}

#### 4. It returns `undefined` on Android for "collapsed" views.
On Android, React may merge multiple views into a single view to achieve better rendering performance. In this case, `UIManager` is not able to measure the view anymore and, therefore, returns `undefined` in its callback.

We can ask React to skip this optimization for shared views using the `collapsable` prop:

{% highlight jsx %}
class SharedView extends Component {
  ....
  render() {
    return (
      <View collapsable={false}
        ....>
        {this.props.children}
      </View>
    )
  }
}
{% endhighlight %}

This `collapsable` doesn't seem to have any effect on iOS. We can just leave it as is.

### Improve rendering performance using `shouldComponentUpdate`

So far we've been calling `setState` in many places:

- When registering shared views
- When we finish measuring the bounding boxes of shared views
- When unregistering shared views

If we allow React to update our transitioner on every change, the animation would look miserable, or perhaps no animation all.

We can use `shouldComponentUpdate` to make sure that we update the transitioner only after we have enough information to create the animation. In fact, we can safely say that, as long as `itemsToMeasure` isn't empty, it's not worth it to update.

{% highlight jsx %}
shouldComponentUpdate(nextProps, nextState: State) {
  return this.props !== nextProps ||  // when props change, we need to update, as navigationState is in the props
    nextState.itemsToMeasure.length === 0;
}
{% endhighlight %}

### Create the animation
Do you realize that we haven't even started on actually creating the animation? All we've done so far is preparation. The post is already pretty long though, so let's leave it to the next post!

## Conclusion

In this post we talked about how to collect shared views and how to measure their bounding boxes. We haven't actually created any animations yet. However, "the journey is the reward" -- we've learned something about React.

My personal takeaways after this project are:

- React renders components in a two-step process. We only have control in the first step (and it's a good thing).
- React elements are plain objects. They are just descriptors, not the real native widgets that draw things on your screen.
- React element trees are shallow. Traversing them isn't as straightforward as it may sound. We'd need to keep creating React elements along the way by calling `render`.
- Use the atomic flavor of `setState` if the new state depends on previous state
- Use `shouldComponentUpdate` to avoid unnecessary component updates

In the next post, we'll be back to the world of Animated: interpolation, input range, output range etc. Stay tuned!

<a name="endofpost">
