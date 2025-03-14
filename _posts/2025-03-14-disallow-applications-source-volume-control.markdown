---
layout: post
title:  "Disallow applications source volume control"
date:   2025-03-14
categories: pipewire wireplumber
---

Pipewire has a quirk property to disallow applications messing with the source volume (funnily enough it has a commented, literal example for discord in `/usr/share/pipewire/pipewire-pulse.conf`): Create the section in e.g. `/etc/pipewire/pipewire-pulse.d/10-adjustQuirkRules.conf`:

```
pulse.rules = [
    {
        matches = [
            {
                # all keys must match the value. ! negates. ~ starts regex.
                #client.name                = "Firefox"
                #application.process.binary = "teams"
                #application.name           = "~speech-dispatcher.*"
            }
        ]
        actions = {
            update-props = {
                #node.latency = 512/48000
            }
            # Possible quirks:"
            #    force-s16-info                 forces sink and source info as S16 format
            #    remove-capture-dont-move       removes the capture DONT_MOVE flag
            #    block-source-volume            blocks updates to source volume
            #    block-sink-volume              blocks updates to sink volume
            #quirks = [ ]
        }
    }
    {
        # skype does not want to use devices that don't have an S16 sample format.
        matches = [
             { application.process.binary = "teams" }
             { application.process.binary = "teams-insiders" }
             { application.process.binary = "skypeforlinux" }
        ]
        actions = { quirks = [ force-s16-info ] }
    }
    {
        # firefox marks the capture streams as don't move and then they
        # can't be moved with pavucontrol or other tools.
        matches = [ { application.process.binary = "firefox" } ]
        actions = { quirks = [ remove-capture-dont-move ] }
    }
    {
        # speech dispatcher asks for too small latency and then underruns.
        matches = [ { application.name = "~speech-dispatcher.*" } ]
        actions = {
            update-props = {
                pulse.min.req          = 512/48000      # 10.6ms
                pulse.min.quantum      = 512/48000      # 10.6ms
                pulse.idle.timeout     = 5              # pause after 5 seconds of underrun
            }
        }
    }
   {
        # prevent all sources matching "Chromium" from messing with the volume
        matches = [ { application.name = "~Chromium.*" } ]
        actions = { quirks = [ block-source-volume ] }
     
    }
    {
        matches = [ { application.process.binary = "Discord" } ]
        actions = { quirks = [ block-source-volume ] }
    }
]
```

if you need to figure a certain application to block, check `pactl list source-outputs` and the application.name (or any other really) property of the offender.

Another example,

```
touch ~/.config/pipewire/pipewire-pulse.conf.d/pipewire-pulse-rules.conf
```

and add the apps that you don’t want to modify your audio:

```
pulse.rules = [
  {
  # Disable mic auto gain for some applications
  matches = [
    { application.process.binary = "chrome" }
    { application.process.binary = "Discord" }
    { application.process.binary = "teams" }
    { application.process.binary = "skypeforlinux" }
  ]
  actions = { quirks = [ block-source-volume ] }
  }
]
```
