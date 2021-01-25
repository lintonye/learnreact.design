---
date: '2018-09-14'
title: 'Get canvas width/height of a code component'
thumbnail:
video:
tags: ['Code', 'Code Component', 'Framer X']
tweet: https://twitter.com/lintonye/status/1040638226065580032
---

Framer passes width/height props to all component instances on the canvas. You can use them to make your own components resizable.

```jsx
class CodeComp extends React.Component {
  render() {
    const { width, height } = this.props
    return (
      <Frame width={width} height={height}>
        ...
      </Frame>
    )
  }
}
```
