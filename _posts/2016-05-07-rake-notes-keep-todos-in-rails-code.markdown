---
layout: post
title:  "rake notes - keep your TODOs in the code"
date:   2016-05-07
categories: rails
---

`rake notes` will search through your code for comments beginning with `FIXME`, `OPTIMIZE` or `TODO`.
The search is done in files with extension *.builder*, *.rb*, *.rake*, *.yml*, *.yaml*, *.ruby*, *.css*, *.js* and *.erb* for both default and custom annotations.

{% highlight bash %}
$ bin/rake notes
(in /home/foobar/commandsapp)
app/controllers/admin/users_controller.rb:
  * [ 20] [TODO] any other way to do this?
  * [132] [FIXME] high priority for next deploy
app/models/school.rb:
  * [ 13] [OPTIMIZE] refactor this code to make it faster
  * [ 17] [FIXME]
{% endhighlight %}

[>> Continue reading <<](https://guides.rubyonrails.org/command_line.html#bin-rails-notes)
