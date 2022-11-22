---
layout: post
title:  "Maven start"
date:   2016-09-24
categories: maven
---

Create project
{% highlight bash %}
$ mvn archetype:generate -DgroupId=ua.org.jee.tutorial \
  -DartifactId=simple \
  -Dpackage=ua.org.jee.tutorial \
  -Dversion=1.0-SNAPSHOT
{% endhighlight %}

Build project

{% highlight bash %}
$ cd simple
$ mvn install
{% endhighlight %}

Run project

{% highlight bash %}
$ java -cp target/simple-1.0-SNAPSHOT.jar ua.org.jee.tutorial.App
Hello World!
{% endhighlight %}

Effective pom

{% highlight bash %}
$ mvn help:effective-pom
{% endhighlight %}
