---
layout: post
title:  "GNOME: Switch wallpaper each login"
date:   2022-11-22
categories: GNOME
---

Load random wallpaper on each login

$ cat ~/.config/autostart/wallpaper.desktop
```
[Desktop Entry]
Name=Wallpaper
GenericName=Set wallpaper on GNOME startup
Comment=Set wallpaper on GNOME startup
Exec=/home/ajg/bin/gnome-wallpaper.sh
Terminal=false
Type=Application
X-GNOME-Autostart-enabled=true
```

$ cat ~/bin/gnome-wallpaper.sh
``` bash
#!/usr/bin/env bash

WALLPAPER="$(~/bin/wallpaper.sh)"

gsettings set org.gnome.desktop.background picture-uri "file://$WALLPAPER"
gsettings set org.gnome.desktop.background picture-uri-dark "file://$WALLPAPER"
```

$ cat ~/bin/wallpaper.sh
``` bash
#!/bin/bash

find ~/Pictures/Wallpapers/ -type f \
     \( -iname '*.jpg' -o -iname "*.png" \) \
    | shuf -n 1
```
