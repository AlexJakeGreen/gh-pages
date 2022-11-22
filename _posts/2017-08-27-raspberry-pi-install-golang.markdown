---
layout: post
title:  "Raspberry Pi 3 Install Golang"
date:   2017-08-26
categories: raspberrypi
---

{% highlight bash %}
sudo apt-get install curl git make binutils bison gcc build-essential
# install gvm
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
source ~/.gvm/scripts/gvm
# install go
gvm install go1.4
gvm use go1.4
export GOROOT_BOOTSTRAP=$GOROOT
gvm install go1.8.3
gvm use go1.8.3 --default
{% endhighlight %}
