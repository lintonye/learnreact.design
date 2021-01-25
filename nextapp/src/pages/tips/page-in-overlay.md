---
date: '2018-11-19'
title: 'Link to another overlay from an overlay (Attempt 1)'
thumbnail: page-in-overlay.mp4.jpg
video: page-in-overlay.mp4
sourceFile: https://www.dropbox.com/s/uz6hifygp0i9xkq/overlay-link-and-page.framerx?dl=0
tags: ['Code', 'Interactive Tools', 'Code Override', 'Framer X']
---

# Overview

> I’ve made an overlay link. From that overlay, I want to link to another overlay but stay at the same parent page. So basically open an overlay, click on a link to close the overlay and open another overlay.

Ideally, if we could invoke navigation links in a code override, we could easily implement this. Unfortunately I haven't found any way to do it yet.

Here's a way to simulate the desired effect using a navigation link and the Page tool. It's not exactly what's requested, but hopefully it's useful too.

Also, See [this tip](/tips/switch-overlay-all-manual/) for another approach that uses animations in code override for a closer simulation.

# Key steps

1. Link to a frame and set the transition to "Overlay"
2. Put a Page into the linked frame
3. Connect the page to the desired blue and purple overlays
4. Use code overrides to switch between two pages

The Page component has a `currentPage` prop that can be set via Code Override.

```js
export const CurrentPage: Override = () => {
  return {
    currentPage: data.currentPage,
  }
}
```

# Conclusion

## Pros

- Easy implementation, just drag&drop and add a few lines of code

## Cons

- Not exactly the requested effect
