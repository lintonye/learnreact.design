---
date: '2018-10-05'
title: 'Make a button/card with on hover state, Method 3: pose'
thumbnail: hover-pose.mp4.jpg
video: hover-pose.mp4
tags: ['Code', 'Code Component', 'Framer X']
sourceFile: https://www.dropbox.com/s/ihf7alj6fq87gpv/hover-pose.framerx?dl=0
tweet: https://twitter.com/lintonye/status/1050468340601253888
---

First, `yarn add react-pose`

Then:

```jsx
const Box = posed.div({
    hoverable: true,
    init: {...},
    hover: {...}
}
```

Check out pose for more cool animations: [https://popmotion.io/pose/](https://popmotion.io/pose/)
