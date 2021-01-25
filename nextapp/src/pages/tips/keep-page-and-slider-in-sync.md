---
date: '2018-11-22'
title: 'Keep Page and Slider in sync, without getting stuck'
thumbnail: page-and-slider.mp4.jpg
video: page-and-slider.mp4
sourceFile: https://framer.com/projects/page-and-slider--zgWicO5nVsr6GVm6NpaB-aeoRI
tags: ['Code', 'Interactive Tools', 'Code Override', 'Framer X']
---

# Overview

Keep the positions of a slider and a page in sync. This sounds straightforward but there's a catch: the page/slide will stop moving after the first run, if we don't take some special care.

# Key points

## Props

- `Page` props:
  - `currentPage`
  - `onChangePage`
- `Slider` props (I'm using [this one](https://packages.framer.com/package/benjamin/slider) in the example)
  - `value`
  - `onValueChange`

## Prevent infinite loop

We'll run into an infinite loop if we write the code override like this:

```jsx
export const Page: Override = () => {
  return {
    currentPage: data.currentPage,
    onChangePage(value) {
      data.currentPage = value
    },
  }
}
```

You see, if the `onChangePage` event is fired, it'll set `data.currentPage` which will call `onChangePage` again!

To prevent this from happening, we'll use a conditional to guard it:

```jsx{5}
export const Page: Override = () => {
  return {
    currentPage: data.currentPage,
    onChangePage(value) {
      if (data.currentPage !== value) {
        data.currentPage = value;
      }
    }
  };
};
```
