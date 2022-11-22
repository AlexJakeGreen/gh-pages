---
layout: post
title:  "St Emacs 256 colors"
date:   2021-03-19
categories: jekyll update
---

Emacs starts very slowly in `st` with default settings.

Put this in your init.el:

```
(defvar xterm-extra-capabilities nil)
(defvar xterm-query-timeout nil)

(add-to-list 'term-file-aliases
             '("st-256color" . "xterm-256color"))
```

Details in `/usr/share/emacs/27.1/lisp/term/xterm.el`
