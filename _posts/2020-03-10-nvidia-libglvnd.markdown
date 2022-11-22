---
layout: post
title:  "Nvidia Optimus: libglvnd"
date:   2020-03-10
categories: libglvnd nvidia optimus
---

* Configuration

/etc/X11/xorg.conf.d/30-nvidia.conf:
```
Section "ServerLayout"
      Identifier "layout"
      Screen 0 "iGPU"
      Option "AllowNVIDIAGPUScreens"
EndSection

Section "Device"
      Identifier "iGPU"
      Driver "modesetting"
      BusID "PCI:0:2:0"
EndSection

Section "Screen"
      Identifier "iGPU"
      Device "iGPU"
EndSection

Section "Device"
      Identifier "nvidia"
      Driver "nvidia"
      BusID "PCI:2:0:0"
EndSection
```

* Tests

glxinfo:
{% highlight bash %}
$ __NV_PRIME_RENDER_OFFLOAD_PROVIDER=NVIDIA-G0 \
    __GLX_VENDOR_LIBRARY_NAME=nvidia \
    glxinfo egrep '(renderer|vendor) string'

server glx vendor string: NVIDIA Corporation
client glx vendor string: NVIDIA Corporation
OpenGL vendor string: NVIDIA Corporation
OpenGL renderer string: GeForce 940MX/PCIe/SSE2
{% endhighlight %}

glxgears:
{% highlight bash %}
$ __NV_PRIME_RENDER_OFFLOAD_PROVIDER=NVIDIA-G0 \
    __GLX_VENDOR_LIBRARY_NAME=nvidia __GL_SYNC_TO_VBLANK=0 \
    glxgears

22971 frames in 5.0 seconds = 4594.111 FPS
22384 frames in 5.0 seconds = 4476.774 FPS
23685 frames in 5.0 seconds = 4737.000 FPS
{% endhighlight %}
