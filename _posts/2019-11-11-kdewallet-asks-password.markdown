---
layout: post
title:  "Updated /etc/pam.d/sddm but kde wallet still asks password"
date:   2019-11-11
categories: kde
---

It is not started.

cat ~/.config/autostart/pam_kwallet_init.desktop:
```
[Desktop Entry]
Hidden=false
Name=KWallet PAM Socket Connection
Comment=Connect to KWallet PAM socket
Exec=/lib64/libexec/pam_kwallet_init
Type=Application
NoDisplay=true
X-KDE-StartupNotify=false
X-KDE-autostart-phase=0
```
