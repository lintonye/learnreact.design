---
date: '2018-10-11'
title: "Integrate text input: get its value out when it's changed."
thumbnail: text-input.mp4.jpg
video: text-input.mp4
tags: ['Code', 'Code Component', 'Code Overrides', 'Framer X']
sourceFile: https://www.dropbox.com/s/2q6uv60l5rcvek9/text-input.framerx?dl=0%C2%A0%E2%80%A6
tweet: https://twitter.com/lintonye/status/1050468340601253888
---

# Overview

The text input here is a standard HTML `<input>` which supports [`change` event](https://developer.mozilla.org/en-US/docs/Web/Events/change). We can wrap this in a code component and expose `onChange` as a prop. In the code override, we can hook into `onChange` in the same way as `onTap`, and use the updated text accordingly.

**Note:** This is a Framer X tip. If you are looking for a tip on how to work with `input` in React in general, check out [this post](/2020/03/31/react-mental-models-working-with-input) instead.

# `TextInput`

```jsx
class TextInput extends React.Component {
  ...
  handleChange = e => {
    const { onChange } = this.props;
    // We pass the new value of the text when calling onChange
    onChange && onChange(e.target.value);
  }
  render() {
    return (
      // Note we need to use "onChange" instead of "onchange"
      // as in HTML.
      <input type="text" onChange={this.handleChange} />
    )
  }
}
```

# `App.tsx` (Code override)

```jsx
export const TextChange: Override = () => {
  return {
    // This is the same idea as onTap, except that we have
    // a parameter here to keep track of the input text.
    onChange(text) {
      data.text = text
    },
  }
}

export const GetText: Override = () => {
  return {
    // Change the text of the label below the text input
    text: data.text,
  }
}
```

# Conclusion

- We can expose the `change` DOM event as a custom prop `onChange`. What [other events](https://developer.mozilla.org/en-US/docs/Web/Events) can we use?
- We can override any prop of a component, even a "custom" prop in our own code components!
