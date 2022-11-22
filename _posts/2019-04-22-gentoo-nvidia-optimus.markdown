---
layout: post
title:  "Nvidia Optimus: Switch on Boot"
date:   2019-04-22
categories: nvidia optimus
---

/etc/init.d/enable-nvidia:
{% highlight bash %}
#!/sbin/openrc-run

depend() {
        need localmount
        before xdm
}

start() {
  if dmesg | grep 'Command line' | grep -q 'enable_nvidia=true' ; then

        test -f /etc/modprobe.d/blacklist-nvidia.conf && rm /etc/modprobe.d/blacklist-nvidia.conf

        modprobe -q nvidia
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
}
{% endhighlight %}

/usr/share/sddm/scripts/Xsetup:
{% highlight bash %}
#!/bin/sh
# Xsetup - run as root before the login dialog appears

if dmesg | grep 'Command line' | grep -q 'enable_nvidia=true' ; then
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
