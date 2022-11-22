---
layout: post
title:  "Nvidia Optimus: Switch on Boot with Systemd"
date:   2019-11-05
categories: nvidia optimus
---

/etc/grub.d/40_custom:
{% highlight bash %}
#!/bin/sh
exec tail -n +3 $0

menuentry 'Gentoo GNU/Linux NVIDIA' {
    load_video
    set gfxpayload=keep
    insmod gzio
    insmod part_gpt
    insmod fat
    search --no-floppy --fs-uuid --set=root 1234-ABCD
    echo    'Loading Linux (NVIDIA) ...'
    linux   /kernel root=/dev/sda1 ro init=/usr/lib/systemd/systemd rootfstype=ext4 acpi_osi=Linux intel_pstate=hwp_only noapic systemd.setenv=GPUMOD=nvidia nvidia-drm.modeset=1
    echo    'Loading initial ramdisk ...'
    initrd  /intel-uc.img /initramfs
}
{% endhighlight %}


/etc/local.d/gpu_switch.start:
{% highlight bash %}
#!/bin/bash

echo "GPUMOD: $GPUMOD"

if [[ "$GPUMOD" == "nvidia" ]] ; then
    rm -f /etc/modprobe.d/blacklist-nvidia.conf
    modprobe -q nvidia
    modprobe -q nvidia_drm
    modprobe -q nvidia_modeset
    if [[ $(eselect opengl show) != nvidia ]] ; then
        eselect opengl set nvidia &>/dev/null
    fi
    cp /etc/X11/xorg.conf_working_nvidia /etc/X11/xorg.conf
else
    echo -e "install nvidia /bin/false\ninstall nvidia_modeset /bin/false\ninstall nvidia_drm /bin/false" > /etc/modprobe.d/blacklist-nvidia.conf

    rmmod nvidia_drm || :
    rmmod nvidia_modeset || :
    rmmod nvidia || :

    if [ -f /etc/X11/xorg.conf ] ; then
        rm /etc/X11/xorg.conf
    fi

    if [[ $(eselect opengl show) != xorg-x11 ]] ; then
        eselect opengl set xorg-x11 &>/dev/null
    fi
fi
{% endhighlight %}

/usr/share/sddm/scripts/Xsetup:
{% highlight bash %}
#!/bin/sh
# Xsetup - run as root before the login dialog appears

if dmesg | grep -i 'command line' | grep -q 'GPUMOD=nvidia' ; then
    xrandr --setprovideroutputsource modesetting NVIDIA-0
    xrandr --auto
fi
{% endhighlight %}

/etc/X11/xorg.conf_working_nvidia:
```
Section "Files"
  ModulePath "/usr/lib/opengl/nvidia"
  ModulePath "/usr/lib32/opengl/nvidia"
  ModulePath "/usr/lib32/xorg/modules"
  ModulePath "/usr/lib64/opengl/nvidia/xorg"
  ModulePath "/usr/lib64/xorg/modules"
EndSection

Section "ServerLayout"
  Identifier "layout"
  Screen 1 "nvidia"
  Inactive "intel"
EndSection

Section "Device"
  Identifier "nvidia"
  Driver "nvidia"
  BusID "PCI:2:0:0"
EndSection

Section "Screen"
  Identifier "nvidia"
  Device "nvidia"
  #Option "AllowEmptyInitialConfiguration" "Yes"
  #Option "UseDisplayDevice" "none"
EndSection

Section "Device"
  Identifier "intel"
  Driver "modesetting"
  Option "AccelMethod" "none"
EndSection

Section "Screen"
  Identifier "intel"
  Device "intel"
EndSection
```
