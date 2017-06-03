---
layout: post
last-modified: '2017-04-22'

title: "React Navigation: Shared element transition 3/3 (the animation)"
#subtitle: "A series of posts about creating custom transitions using NavigationExperimental."
#cover_image: "navigation-custom-transition/transit.jpg"

excerpt: "Blog series: creating custom transitions using NavigationExperimental. This post covers the creation of animations using Animated."

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
- *[Shared element transition 2/3: bounding boxes](/2017/01/25/react-navigation-shared-element-transition-2.html)*
- *Shared element transition 3/3: the animation (this post)*

---

Time flies! I really appreciate your patience for this piece. In fact, I've been busy with something fairly relevant:

1. This [pull request](https://github.com/react-community/react-navigation/pull/941) for shared element transition in React Navigation.
2. A [proposal and initial implementation](https://github.com/react-community/react-navigation/issues/175) of custom transitions in React Navigation.
3. A couple of courses about React Native (more on that in future posts).

Alright, enough excuses. :) Let's continue our adventure about shared element transition. In the [last post](/2017/01/25/react-navigation-shared-element-transition-2.html), we've discussed the core challenges in implementing shared element transition. Once we get the bounding boxes of the shared elements on both from and to scenes, we'll be ready to animate them. Let's finally look at that in this post!

You can find the full source code in [this repo](https://github.com/lintonye/react-native-diary/tree/master/transitions). However, I've generalized the core ideas and implemented a generic way to create custom transitions in [this pull request](https://github.com/react-community/react-navigation/pull/941). Feel free to compare the two and you'll find the connection. Of course the latter should be considered more mature, and it's still evolving as you can tell from the comments on GitHub.

## Some more preparation
Before actually animating the shared elements, let's do some prep work: we'll study closely how to create an overlay, how to clone items onto it, a handy notion that makes things easier ("from" and "to" items), and whether to use `progress` or `position` to create the animations.

### Overlay
Recall that most of the magic happens on an overlay? We want an overlay that covers the entire screen and is visible only during transition.

Aside from making it absolutely positioned, we need to set a high enough elevation value on Android to make sure the overlay covers everything, for example toolbars that usually have higher elevation.

{% highlight jsx %}
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    elevation: 100, // make sure it's on the top on Android.
  },
{% endhighlight %}

To show and hide the overlay, we can just animate its opacity:

{% highlight jsx %}
const animatedContainerStyle = {
  opacity: transitionProps.progress.interpolate({
    inputRange: [0, 0.0001, 0.9999, 1],
    outputRange: [0, 1, 1, 0],
  })
};
{% endhighlight %}

Finally, to prevent the overlay from eating up all touch events, we'll set its `pointerEvents` to `none`.

{% highlight jsx %}
//
<Animated.View style={[styles.overlay, animatedContainerStyle]} pointerEvents="none">
  {clones}
</Animated.View>
{% endhighlight %}

### Cloning shared elements and hiding the originals
Now that we have an overlay, we can clone the shared elements using `React.cloneElement()`:

{% highlight jsx %}
React.cloneElement(item.reactElement, {
  style: [item.reactElement.props.style, styles.clonedItem, animatedStyle],
  key: `clone-${item.id}`
}, []);
{% endhighlight %}

In the code above, `item.reactElement` is a React element (the result of `render()`) saved when the shared element registers itself (this is covered in detail in the [previous post](/2017/01/25/react-navigation-shared-element-transition-2.html)). `animatedStyle` is the style that we are going to create soon to actually animate the cloned views.

To make the transition more realistic, we also want to hide the original views during the transition. This is fairly similar to how we show/hide the overlay:

{% highlight jsx %}
const originalViewStyle = {
  opacity: transitionProps.progress.interpolate({
    inputRange: [0, 0.9999, 1],
    outputRange: [0, 1, 1],
  })
};
{% endhighlight %}

### Items on "from" and "to" routes
In order to animate a shared item, we need to measure its original bounding box before the transition starts, and its final bounding box when the transition completes. But how do we know which item is the origin and which is the destination? We can use a handy notion of "from" and "to" routes.

As shown below, we can get the "from" and "to" routes whenever the component receives a new `navigation` prop:

{% highlight jsx %}
componentWillReceiveProps(nextProps: Props) {
  if (this.props.navigation !== nextProps.navigation) {
    const getRoute = props => props.navigation && {
      ...props.navigation.state.routes[props.navigation.state.index],
      index: props.navigation.state.index,
    };
    this._fromRoute = getRoute(this.props);
    this._toRoute = getRoute(nextProps);
    ...
  }
}_
{% endhighlight %}

Afterwards, we can deduct which items are on "from" and "to" routes, respectively:

{% highlight jsx %}
const isOnRoute = route => item => item.routeName === (route && route.routeName);

const fromItems = allItems.filter(isOnRoute(this._fromRoute));
const toItems = allItems.filter(isOnRoute(this._toRoute));
{% endhighlight %}_

### `position` or `progress`?
If you recall, `transitionProps` includes two animated values: `progress` and `position`. When creating the style for the overlay above, I used `progress` just for convenience. Its `inputRange` is very simple to set up since the value of `progress` always changes from 0 to 1:

{% highlight jsx %}
progress.interpolate({
  inputRange: [0, 1],
  ...
});
{% endhighlight %}

However, this simplicity of inputRange is also its disadvantage. Since it always goes from 0 to 1, we cannot use it to distinguish the direction of a transition, i.e. whether we're opening a new screen, or moving back to an existing screen. We are confined to create the same animation in either direction.

We can see this issue in action by doing the edge swipe gesture on iOS which navigates back to an existing screen.

<iframe width="282" height="500" src="//www.youtube.com/embed/cCKeLtPDQ1c?controls=0&amp;rel=0&amp;showinfo=0;" frameborder="0" allowfullscreen></iframe>

As shown above, the shared element on the overlay is never visible while the edge swipe is happening. This is because `progress` stays `0` which makes the opacity of the overlay always `0`.

`position` is here to the rescue. It represents the index of the current screen in the stack. When opening a new screen, its value increases, e.g. from 0 to 1. On the other direction, its value decreases, e.g from 4 to 3. `position` is updated continuously both during the transition and when the user is performing an edge swipe gesture. We can now create different animations for different transition directions based on this value.

Of course it's trickier to set up the inputRange in the interpolation since the value range isn't fixed. To handle that, we compute the maximum and minimum indices of "from" and "to" routes, and use them as input range values:

{% highlight jsx %}
const maxIndex = Math.max(this._fromRoute.index, this._toRoute.index);
const minIndex = Math.min(this._fromRoute.index, this._toRoute.index);
const animatedContainerStyle = {
  opacity: transitionProps.position.interpolate({
    inputRange: [minIndex, minIndex + 0.0001, maxIndex - 0.0001, maxIndex],
    outputRange: [0, 1, 1, 0],
  })
};_
{% endhighlight %}

Here's the result after we use `position` to interpolate every animated style:

<iframe width="282" height="500" src="//www.youtube.com/embed/ntTj0Y_oWKs?controls=0&amp;rel=0&amp;showinfo=0;" frameborder="0" allowfullscreen></iframe>

## Animating shared elements
It's now time to animate the shared elements! Even with all the preparation that we've done, it's still trickier than I originally expected (that's why it took me so much time!). We need to choose which style props to animate based on the type of the view. Please read on.

### Animating scale
The first approach I thought of was to animate the `scaleX` and `scaleY` according to the sizes of the shared elements on the from and to scenes.

{% highlight jsx %}
const scaleX = position.interpolate({
  // Note: this assumes fromIndex < toIndex. If fromIndex > toIndex,
  // we need to reverse both inputRange and outputRange.
  inputRange: [fromIndex, toIndex],
  outputRange: [1, toItem.metrics.width / fromItem.metrics.width],
});
...
const style = {
  transform: [
    { scaleX }, { scaleY }
  ]
};
{% endhighlight %}

There are actually more steps to get the animation exactly right, but let's skip them since this approach has a problem: if the aspect ratio of the shared item changes when moving to the next scene, the animation will look a little strange:

<iframe width="282" height="500" src="//www.youtube.com/embed/Nk2PG7OZ_mA?controls=0&amp;rel=0&amp;showinfo=0;" frameborder="0" allowfullscreen></iframe>

This led me to explore other approaches.

### Animating width/height
In fact if the shared item is an `Image`, we can just animate its width and height! (how come didn't I think of this in the first place...) If the `resizeMode` of the shared item remain the same on the from and to scenes, the animation looks pretty good even if the aspect ratio changes.

<iframe width="282" height="500" src="//www.youtube.com/embed/LJl0hNzoWmg?controls=0&amp;rel=0&amp;showinfo=0;" frameborder="0" allowfullscreen></iframe>

It's fairly straightforward to create the animations as well:

{% highlight jsx %}
const width = position.interpolate({
  // Note: this assumes fromIndex < toIndex. If fromIndex > toIndex, we need to reverse both inputRange and outputRange.
  inputRange: [fromIndex, toIndex],
  outputRange: [fromItem.metrics.width, toItem.metrics.height]  
});
....
const style = {
  width, height, left, top,
}
{% endhighlight %}

### Animating fontSize
Now that we know how to animate images, what about Text? Simply animating width or height or the scale won't work well. We want to animate its fontSize.

The question is how we could get the font sizes of the "from" and "to" items. We know that font size is defined in the `style` prop of a Text. Is it as simple as just extracting it from the style?

{% highlight jsx %}
const fontSize = reactElement.props.style.fontSize;
{% endhighlight %}

Not really. We indeed need to work with the `style` prop, but it takes a couple of extra steps to actually get the fontSize.

If we print out the `style` prop of a react element, we'll see something like this:

{% highlight jsx %}
style: 20
{% endhighlight %}

Why are all styles reduced to just a number? It turns out that the styles are cached in a central registry where we can look up by an index (e.g. the number `20` above) and get the actual style object:

{% highlight jsx %}
import ReactNativePropRegistry from 'ReactNativePropRegistry';
const styleObj = ReactNativePropRegistry.getByID(style);
const { fontSize } = styleObj;
{% endhighlight %}

Additionally, React Native allows us to assign an array to the `style` prop where a style appears at the rear overrides those at the front:

{% highlight jsx %}
<Text style={[styles.commonText, { fontSize: 20 }]}>
{% endhighlight %}

This needs some special treatment. We need to recursively walk through the embedded arrays to find the last fontSize and extract its value, either from the registry or directly if it's a style object.

To put things together, we can get the font size of a React element like so:

{% highlight jsx %}
import ReactNativePropRegistry from 'ReactNativePropRegistry';
const findLastFontSize = (style) => {
  if (_.isNumber(style)) {
    const styleObj = ReactNativePropRegistry.getByID(style);
    return styleObj && styleObj.fontSize;
  } else if (_.isArray(style)) {
    for (let i = style.length - 1; i >= 0; i--) {
      const fontSize = findLastFontSize(style[i]);
      if (_.isNumber(fontSize)) return fontSize;
    }
  } else if (_.isObject(style)) {
    return style.fontSize;
  }
  return undefined;
}
const getFontSize = element => {
  const { style } = element.props;
  return findLastFontSize(style);
}
{% endhighlight %}

After we know the font size of both "from" and "to" items, it is a cakewalk to animate them.

## Revisiting goals
OK Great! By far we've covered all aspects of creating a shared element transition. At the [beginning](/2017/01/23/react-navigation-shared-element-transition-1.html), we set three goals for this experiment. Let's revisit them to see how well we are doing:

### 1. Pure JavaScript
This one is apparent, I've never written a line of Java or Objective-C or Swift in the posts, right?

### 2. Minimal API
In the second [post](/2017/01/25/react-navigation-shared-element-transition-2.html), I presented an API like this:

{% highlight jsx %}
// on photo grid screen
<SharedView name='photo1' containerRouteName='PhotoGrid'>
  <Image source={image} />
</SharedView>
{% endhighlight %}

This is reasonable, but you'll actually notice an even simpler API in the shared element transition [pull request](https://github.com/react-community/react-navigation/pull/941):

{% highlight jsx %}
<Transition.SharedElement.Image id='photo1' source={image} />
{% endhighlight %}

There are two improvements involved here:

1. Instead of using a wrapper `SharedView` which can bloat up the jsx fairly quickly, you can use a HOC (higher order component) in the same fashion as `Animated` components.
2. The prop `containerRouteName` is removed since the same information can be passed via context.

I'm confident that this API is fairly easy to use now. What do you think?

### 3. Reasonably smooth on older devices
I set a performance goal of 40 FPS on an old Nexus 5, roughly the same as the frame rate of the default CardStack animation. So far the best I can achieve is 20-30 FPS.

Let's see what caused the dropped frames.

#### `useNativeDriver = false`
The Animated library has a hidden configuration property `useNativeDriver`. If set to `true`, native code will be used to drive the animation. Otherwise, JavaScript will be the driver which is understandably much slower.

Unlike the default CardStack transition where `useNativeDriver` is `true`, unfortunately we have to set it to `false` for shared element transition.

Why? Remember we animated `width` and `height` of images to achieve the best result? Sadly, the Animated native driver does not yet support these properties. In fact all properties that affect the layout are not supported yet, such as `left` and `top`.

On the other hand, if we instead animate the scale properties (`scaleX` and `scaleY`) of shared elements, and use `translateX` and `translateY` to update their locations, we can use the native driver. The frame rate will be better, but images will be skewed if their aspect ratio changes during the transition.

#### Extra updates
The second reason for the dropped frames is the extra work required to implement the shared element transition. This includes the measuring of the bounding boxes, and the registration of new shared elements when the component is mounted. The best we can do is to minimize the number of times they are executed.

The bounding box measuring is particularly expensive (in the order of tens of milliseconds per element) because it involves calling into the native code and carrying the data back to JS. Therefore, we need to minimize the number of views that are measured during the transition. That's why I added a [`getItemsToMeasure` function](https://github.com/lintonye/react-navigation/blob/shared-element/src/views/Transition/Transitions/SharedElement.js#L89) in the PR which only returns the matching items on the "from" and "to" routes.

It's worth noting that I have spent quite a bit of time making sure the component updates only when necessary. I added a logging statement in `componentDidUpdate` that prints the number of updates so far and then worked to reduce that number.

{% highlight jsx %}
 componentDidUpdate(prevProps, prevState) {
   this.updateCount = this.updateCount || 0;
   this.updateCount++;
   console.log(`======> ${this.updateCount} cardStack updated`);
 }
{% endhighlight %}

This technique may be useful for you too to optimize the performance of your components. If you know better ways, let me know!

## Conclusion
Alright, this is the final post about shared element transition. You can check out the code in [this PR](https://github.com/react-community/react-navigation/pull/941) which also includes an implementation of custom transitions. In the mean time, the code in [this repo](https://github.com/lintonye/react-native-diary/tree/master/transitions) might be easier to understand since it's only about shared element transition. However, it does not include some optimizations I've done in the aforementioned PR.

Here's what we've covered in this post:

- How to create, show and hide the overlay
- How to clone the shared elements and hide the original ones
- A handy notion that helps us determine which item is the origin and which item is the destination during the transition: "from" and "to" routes
- A comparison of `position` and `progress` and why `position` is better
- Various ways to animate the shared elements, and why we don't want to always animate the scale
- A discussion about the goals we set at the beginning

This journey turned out to be much longer (and rewarding) than I expected. I hope you have learned one thing or two by reading my struggles and be able to apply them in your own projects. In the meantime, I'm working with the rest of React Navigation team to make custom transitions as easy as possible, so that you don't have to repeat what I'm doing.

Let me know what you think in the comments! Thanks for reading.

<a name="endofpost">
