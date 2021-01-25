---
date: '2018-11-27'
title: 'Schedule something to happen, and make it cancelable'
thumbnail: schedule-with-timeout.mp4.jpg
video: schedule-with-timeout.mp4
tags: ['Code', 'Code Override', 'Framer X']
sourceFile: https://www.dropbox.com/s/nocap6k4gd7w04f/schedule-with-timeout.framerx?dl=0
tweet:
---

# Overview

How to schedule something to happen in X seconds, with the option to cancel it at any time?

In this example, we want to hide the bird if the user presses it and holds for 2 seconds. If the user releases the mouse too soon, the bird will bounce back to the normal size and won't disappear.

We can use `setTimeout()` to implement this behavior.

# `SetTimeout`

```js
onTapStart() {
  // hide the bird 2 seconds (2000 milliseconds) later
  hideBirdTimeout = setTimeout(() => {
    animate.spring(data.opacity, 0);
  }, 2000);
},
```

In `onTapEnd`, we'll clear this timeout. So, when the mouse is released before the timeout function executes, it won't run at all.

```js
onTapEnd() {
  // don't hide the bird if released too soon
  clearTimeout(hideBirdTimeout);
}
```
