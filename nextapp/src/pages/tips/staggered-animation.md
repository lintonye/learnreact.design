---
date: '2018-09-01'
title: 'Staggered animation?'
thumbnail: staggered.mp4.jpg
video: staggered.mp4
tags: ['Code', 'Code Overrides', 'Framer X']
sourceFile: https://www.dropbox.com/s/jllufdqcqethf3h/stagger.framerx?dl=0
tweet: https://twitter.com/lintonye/status/1036086055630303232
---

X provides a great way to chain animations: `async`/`await`. But how to make animations staggered? i.e. add delay but NOT wait until it finishes?

Solution: Use a dummy `Animatable` with shorter duration, and wait on the dummy instead of the real anim
