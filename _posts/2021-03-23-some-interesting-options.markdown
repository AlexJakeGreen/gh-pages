---
layout: post
title:  "Some interesting options"
date:   2021-03-23
categories: linux
---

* Hide processes running as other users

The proc filesystem supports the following mount option `hidepid`

0   Everybody  may access all /proc/[pid] directories.  This is the traditional behavior, and the default if this mount option is not specified.

1   Users may not access files and subdirectories inside any /proc/[pid]  directories  but  their  own  (the /proc/[pid]  directories  themselves  remain  visible)

2   As for mode 1, but in addition the /proc/[pid] directories belonging to other  users  become  invisible.


```
mount -o remount,rw,nosuid,nodev,noexec,relatime,hidepid=2 /proc
```

$ cat /etc/fstab
```
proc    /proc    proc    defaults,nosuid,nodev,noexec,relatime,hidepid=2     0     0
```

* Disable reading kernel message buffer for unprivileged users

```
sysctl -w kernel.dmesg_restrict=1
```
