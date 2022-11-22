---
layout: post
title:  "Nsenter Invalid Argument"
date:   2017-08-14
categories: docker
---

**Problem:** you tried to enter docker namespace but got an error:
```
nsenter: reassociate to namespace 'ns/net' failed: Invalid argument
```

This can be caused by docker daemon started with `MountFlags=slave`

**Solution:** Use a double nsenter:
{% highlight bash %}
nsenter -m -t $(cat /var/run/docker.pid) \
    nsenter --net=/var/run/docker/netns/${network_id} ip link
{% endhighlight %}
