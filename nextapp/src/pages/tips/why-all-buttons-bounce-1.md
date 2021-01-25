---
date: '2018-11-25'
title: 'Why do all buttons bounce? Part 1'
thumbnail: all-buttons-bounce.mp4.jpg
video: all-buttons-bounce.mp4
tags: ['Code', 'Code Override', 'Framer X']
sourceFile: https://www.dropbox.com/s/i9ocmujddnpvkf9/all-buttons-bounce.framerx?dl=0
tweet:
---

# Overview

All three buttons are assigned with the same override `Scale`. Why do they all bounce when only one button is clicked?

Solutions:

- Use different overrides for each of them (this tip)
- [Use code component](/tips/why-all-buttons-bounce-2)

# Why does this happen?

Why? Because all three buttons are associated with the same data source, `data.scale`. When it changes, the `scale` prop of all three buttons are updated accordingly.

To fix it, create separate code overrides that associate the buttons with separate data sources, like so:

```js
const data = Data({
  scale1: Animatable(1),
  scale2: Animatable(1),
  scale3: Animatable(1)
});

export const Scale1: Override = () => {
  return {
    scale: data.scale1,
    onTap() {
      data.scale1.set(0.6);
      animate.spring(data.scale1, 1);
    }
  };
};

export const Scale2: Override = () => {
  return {
    scale: data.scale2,
    onTap() {
      data.scale2.set(0.6);
      animate.spring(data.scale2, 1);
    }
  };
};

...
```

# Improvement: DRY

DRY, acronym for Do not Repeat Yourself, is an important principle in programming. In this example, we can reduce repetition by extracting the common code into a function, like so:

```js
function buttonOverride(scale) {
  return {
    scale,
    onTap() {
      scale.set(0.6)
      animate.spring(scale, 1)
    },
  }
}

export const Scale1: Override = () => buttonOverride(data.scale1)
export const Scale2: Override = () => buttonOverride(data.scale2)
export const Scale3: Override = () => buttonOverride(data.scale3)
```
