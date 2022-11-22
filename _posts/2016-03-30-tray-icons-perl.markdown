---
layout: post
title:  "Gtk2 Icon Perl Example"
date:   2016-03-30
categories: gtk2 perl
---

Icons in tray. Example. Shows a number `$i` in a tray, increments it every 1,5 seconds.

{% highlight perl %}
#!/usr/bin/perl
use strict;
use warnings;
use Gtk2;
use Gtk2::TrayIcon;

my ($icon, $label, $eventbox);
my $i=0;
my $timeout = 1500; #ms

sub label_refresh{
   my $text = shift;
   $label->set_label($text);
};

sub get_value{
   return ++$i;
};

Gtk2->init();
$icon = Gtk2::TrayIcon->new("MI count applet");
$eventbox = Gtk2::EventBox->new();
$label = Gtk2::Label->new("0");
$eventbox->add($label);
$icon->add($eventbox);

&label_refresh(&get_value());

Glib::Timeout->add($timeout, sub { &label_refresh(&get_value()); 1;});

$icon->show_all();
Gtk2->main();
exit $?;
{% endhighlight %}
