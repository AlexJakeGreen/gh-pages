---
layout: post
title:  "Virt-manager not accepting any input, mouse or keyboard"
date:   2026-02-07
categories: virt manager
---

The issue is mouse and keyboard doing nothing while trying to install a Windows 7 or 10 ISO in virt-manager.
Solved it by changing the VM's chipset to i440FX instead of the default q35.
This can be done by selecting the option to customize before install, which is on the last page of the setup wizard.
