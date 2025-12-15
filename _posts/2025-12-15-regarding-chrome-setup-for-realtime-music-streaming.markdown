---
layout: post
title:  "Regarding Chrome Setup for Realtime Music Streaming"
date:   2025-12-15
categories: chrome guitar
---


## Flags

A few Chome defaults that need change.

Automatic microphone volume adjustment – must be set to `Disabled`:

`chrome://flags/#enable-webrtc-allow-input-volume-adjustment`


Echo cancellation – must be `Disabled`:

`chrome://flags/#chrome-wide-echo-cancellation`


## Start Args

The settings provided above are global for all profiles.
This means profile separation does not work, and the split is to be done via different config directories instead:

`--user-data-dir="${HOME}/.config/google-chrome-guitar" --profile-directory="Default"`
