---
layout: post
title:  "Split number by groups with three digits"
date:   2016-04-14
categories: bash perl
---

{% highlight bash %}
$ ls /tmp -al
-rw-------  1 user user 667030687 Apr 14 11:06 huge.log.gz
{% endhighlight %}

{% highlight bash %}
groupnum() {
  perl -pe 's;(?<=\d)(\d{3})(?=(\d{3})*(\D|$));.$1;g;'
}
{% endhighlight %}

{% highlight bash %}
$ ls /tmp -al | groupnum
-rw-------  1 user user 667.030.687 Apr 14 11:06 huge.log.gz
{% endhighlight %}
