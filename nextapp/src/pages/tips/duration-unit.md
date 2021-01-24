---
date: '2018-09-01'
title: 'The unit of duration in "transition" is second, not millisecond.'
thumbnail:
video:
tags: ['Code', 'Code Overrides', 'Framer X']
tweet: https://twitter.com/lintonye/status/1035948621592551424
---

No wonder why the animation stopped working as soon as a duration is added. It's not broken, just VERY slow.🤦‍

```jsx
// This animation will last 10 minutes, not 600 milliseconds!
<Frame animate={{ opacity: 0 }} transition={{ duration: 600 }} />
```
