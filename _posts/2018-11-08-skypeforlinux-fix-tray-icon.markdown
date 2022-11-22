---
layout: post
title:  "Skypeforlinux: fix tray icon"
date:   2018-11-08
categories: skypeforlinux
---

{% highlight bash %}
cat ~/.npmrc
  prefix=~/.node-modules
{% endhighlight %}

{% highlight bash %}
mkdir /tmp/skype
cd /tmp/skype
cp /opt/skypeforlinux/resources/app.asar ./
npm install -g asar
asar extract /usr/share/skypeforlinux/resources/app.asar ./skypeapp
cd ./skypeapp/images/tray/linux
ls -1 | grep "@2x" | while read -r pngFile; do cp "./$pngFile" "./${pngFile//$@@2x/}"; done
cd ../../../../
asar pack ./skypeapp ./app.asar
sudo cp ./app.asar /opt/skypeforlinux/resources/app.asar
{% endhighlight %}
