---
layout: post
title:  "Ruby Objects Graph"
date:   2016-04-12
categories: ruby
---

{% highlight ruby %}
puts 'strict graph { rankdir="LR"'
puts ObjectSpace.each_object(Module).
      select { |o| o.name unless o.to_s[/^Errno/] }.
      map { |o| o.ancestors.map { |a| %'"#{a}"' }.reverse * '--' }
puts '}'
{% endhighlight %}

{% highlight bash %}
$ ./test.rb > test.dot
$ dot -Tjpg test.dot > test.jpg
{% endhighlight %}

![Ruby object graph](/assets/images/ruby-object-graph.jpg)
