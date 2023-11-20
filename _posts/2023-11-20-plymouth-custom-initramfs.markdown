---
layout: post
title:  "Plymouth: Custom initramfs with LUKS"
date:   2023-11-20
categories: custom initramfs luks
---


```
USE="-udev" emerge -av1 plymouth
plymouth-set-default-theme bgrt
```

init:
```
# early in the process start plymouthd and show splash
if test -x /usr/sbin/plymouthd -a -x /usr/bin/plymouth;
then
        mkdir -p /run/plymouth
        /usr/sbin/plymouthd --attach-to-session --pid-file /run/plymouth/pid --mode=boot
        /usr/bin/plymouth show-splash
fi


if command -v plymouth >/dev/null 2>&1 && plymouth --ping 2>/dev/null
then
    plymouth ask-for-password \
             --number-of-tries=3 \
             --prompt="A password is required to access the volume" \
             --command="/sbin/cryptsetup luksOpen --allow-discards ${device} ${name}"
else
    cryptsetup luksOpen --allow-discards ${device} ${name} || rescue_shell "luksOpen failed"
fi

```

mk_initramfs.sh:
```
# populate plymouth if available
if [ -x /usr/libexec/plymouth/plymouth-populate-initrd ]
then
        /usr/libexec/plymouth/plymouth-populate-initrd -t $PREFIX
fi
```
