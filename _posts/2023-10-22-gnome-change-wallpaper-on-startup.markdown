---
layout: post
title:  "GNOME: Change wallpaper each start"
date:   2023-10-22
categories: GNOME
---

~/bin/wallpaper.sh
```
#!/bin/bash

find ~/Pictures/Wallpapers/ -type f \
     \( -iname '*.jpg' -o -iname "*.png" \) \
    | shuf -n 1
```

~/bin/gnome-wallpaper.sh
```
#!/usr/bin/env bash

WALLPAPER="$(~/bin/wallpaper.sh)"

gsettings set org.gnome.desktop.background picture-uri "file://$WALLPAPER"
gsettings set org.gnome.desktop.background picture-uri-dark "file://$WALLPAPER"
```

~/.config/autostart/set-wallpaper.desktop
```
[Desktop Entry]
Name=Set Wallpaper
GenericName=A script that runs at Gnome startup
Comment=Runs the script in Exec path
Exec=/home/green/bin/gnome-wallpaper.sh
Terminal=false
Type=Application
X-GNOME-Autostart-enabled=true
```
