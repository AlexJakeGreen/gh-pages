---
layout: post
title:  "Vagrant: persistent storage plugin"
date:   2017-02-10
categories: vagrant
---

[Project page](https://github.com/kusnier/vagrant-persistent-storage)

{% highlight bash %}
$ vagrant plugin install vagrant-persistent-storage
{% endhighlight %}

{% highlight ruby %}
config.persistent_storage.enabled = true
config.persistent_storage.location = "~/development/sourcehdd.vdi"
config.persistent_storage.size = 5000
{% endhighlight %}
