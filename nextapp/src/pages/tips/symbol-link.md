---
date: '2018-10-10'
title: "If you work with code components a lot, it's better to create a symbol link to the Framer directory"
thumbnail:
video:
tags: ['Code', 'Framer X']
tweet: https://twitter.com/lintonye/status/1050155473201029120
---

```bash
ln -s ~/Library/Autosave\ Information/Framer-XXXXX/container /path/to/your/directory
```

Then, you can open VSCode in command line:

```bash
code /path/to/your/directory
```

Or `git init`, or whatever.

<!-- Make sure to check out this [gitignore file](/tips/git-ignore-file). -->
