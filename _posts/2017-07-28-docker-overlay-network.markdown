---
layout: post
title:  "Docker overlay network"
date:   2017-07-28
categories: docker
---

The purpose of this work is to investigate how overlay network works under the hood.

Before we start, create a swarm cluster as it is described in [Swarm Tutorial](https://docs.docker.com/engine/swarm/swarm-tutorial) or take this [Vagrant file](https://gist.github.com/AlexJakeGreen/1c49d08fe429e744638d7623f8909206) and setup your box with guest additions.

Create an overlay network and a service
{% highlight bash %}
[vagrant@manager ~]$ docker network create \
                      --driver overlay --subnet 192.168.55.0/24 mynet
qhmpedvga9n8xn6hg7tqwqi3v

[vagrant@manager ~]$ docker service create \
                      --replicas 2 --name service1 \
                      --network mynet centos:7 sleep 7200
se8wl46ymy0wtmwg7be561qv3

[vagrant@manager ~]$ docker service ps service1
ID                  NAME                IMAGE               NODE                DESIRED STATE
jg9lrlz68cdy        service1.1          centos:7            worker1             Running
ih9dv2hqp88p        service1.2          centos:7            manager             Running
{% endhighlight %}

`ip netns` looks for network namespaces in `/var/run/netns`, but Docker keeps them in different place and does not create symlink. Let's create it by hands:
{% highlight bash %}
[vagrant@manager ~]$ sudo ln -s /var/run/docker/netns /var/run/netns
[vagrant@manager ~]$ sudo ip netns ls
d7b2c48c9596 (id: 4)
1-qhmpedvga9 (id: 3)
1-d4j6wl1h53 (id: 0)
ingress_sbox (id: 1)
{% endhighlight %}

`d7b2c48c9596` is a network namespace of a container running on this node:
{% highlight bash %}
[vagrant@manager ~]$ docker ps
CONTAINER ID        IMAGE               COMMAND
2ccc289ad154        centos:7            "sleep 7200"
[vagrant@manager ~]$ docker inspect --format '{% raw %}{{.NetworkSettings.SandboxKey}}{% endraw %}' 2ccc289ad154
/var/run/docker/netns/d7b2c48c9596

[vagrant@manager ~]$ sudo ip netns exec d7b2c48c9596 ip addr show eth0
22: eth0@if23: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue state UP
    link/ether 02:42:c0:a8:37:04 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 192.168.55.4/24 scope global eth0
       valid_lft forever preferred_lft forever
    inet 192.168.55.2/32 scope global eth0
       valid_lft forever preferred_lft forever
{% endhighlight %}

`1-d4j6wl1h53` is actually a namespace for overlay network created by `swarm init`, `1-qhmpedvga9` is our created network named `mynet`:
{% highlight bash %}
[vagrant@manager ~]$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
74085784b064        bridge              bridge              local
8cfbba323428        docker_gwbridge     bridge              local
0219b460f977        host                host                local
d4j6wl1h53pm        ingress             overlay             swarm
qhmpedvga9n8        mynet               overlay             swarm
6778312ead85        none                null                local
{% endhighlight %}

It's time to look inside overlay network namespace:
{% highlight bash %}
[vagrant@manager ~]$ sudo ip netns exec 1-qhmpedvga9 ip -d link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00 promiscuity 0 addrgenmode eui64 
2: br0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue state UP mode DEFAULT 
    link/ether 52:33:20:40:d1:d0 brd ff:ff:ff:ff:ff:ff promiscuity 0 
    bridge forward_delay 1500 hello_time 200 max_age 2000 addrgenmode eui64 
21: vxlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue master br0 state UNKNOWN mode DEFAULT 
    link/ether 52:33:20:40:d1:d0 brd ff:ff:ff:ff:ff:ff link-netnsid 0 promiscuity 1 
    vxlan id 4097 srcport 0 0 dstport 4789 proxy l2miss l3miss ageing 300 
    bridge_slave addrgenmode eui64 
23: veth0@if22: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue master br0 state UP mode DEFAULT 
    link/ether 62:89:ad:a6:98:f1 brd ff:ff:ff:ff:ff:ff link-netnsid 1 promiscuity 1 
    veth 
    bridge_slave addrgenmode eui64
{% endhighlight %}

`veth0` is a peer interface of eth0 inside container
`vxlan0` is a virtual network interface for containers inter-node communication
`br0` is a bridge connecting all `vethN` and `vxlan0` together

{% highlight bash %}
[vagrant@manager ~]$ sudo ip netns exec 1-qhmpedvga9 bridge link show
21: vxlan0 state UNKNOWN : <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 master br0 state forwarding priority 32 cost 100 
23: veth0 state UP @(null): <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 master br0 state forwarding priority 32 cost 2 
{% endhighlight %}

`02:42:c0:a8:37:04` is a container `2ccc289ad154` running on manager node and container ip address is 192.168.55.4.
`02:42:c0:a8:37:03` is a container `6de050036519` running on worker node, container ip is 192.168.55.3.

Now it's clear to us that the communication between nodes works over `VXLAN` driver.
But how Docker's VXLAN is juggling on L2 level, how MAC addresses are being populated between nodes?
Start `arping` from first container and inspect network traffic in second one, observe there are no any arp requests received on remote container side:
{% highlight bash %}
[root@2ccc289ad154 /]# arping -I eth0 192.168.55.3
ARPING 192.168.55.3 from 192.168.55.4 eth0
Unicast reply from 192.168.55.3 [02:42:C0:A8:37:03]  0.615ms
Unicast reply from 192.168.55.3 [02:42:C0:A8:37:03]  0.551ms
Unicast reply from 192.168.55.3 [02:42:C0:A8:37:03]  0.686ms
Unicast reply from 192.168.55.3 [02:42:C0:A8:37:03]  0.570ms
***

[root@6de050036519 /]# tcpdump -qlni eth0 arp
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 65535 bytes

# Nothing here!
{% endhighlight %}

In case both containers running inside the same node, we can sniff all arp broadcast from all this node containers:
{% highlight bash %}
[vagrant@manager ~]$ docker service scale se8wl46ymy0w=3
se8wl46ymy0w scaled to 3

[vagrant@manager ~]$ docker service ps --format '{% raw %}table {{.ID}}\t{{.Node}}{% endraw %}' se8wl46ymy0w
ID                  NODE
jg9lrlz68cdy        worker1
ih9dv2hqp88p        manager
x1gmh1pztgjf        manager
# two tasks are running on manager node

***
[root@0f834be1f266 /]# arping -I eth0 192.168.55.4
ARPING 192.168.55.4 from 192.168.55.5 eth0
Unicast reply from 192.168.55.4 [02:42:C0:A8:37:04]  0.563ms
Unicast reply from 192.168.55.4 [02:42:C0:A8:37:04]  0.582ms
Unicast reply from 192.168.55.4 [02:42:C0:A8:37:04]  0.561ms
Unicast reply from 192.168.55.4 [02:42:C0:A8:37:04]  0.560ms

***
[root@2ccc289ad154 /]# tcpdump -qlni eth0 arp
11:26:11.750195 ARP, Request who-has 192.168.55.4 (Broadcast) tell 192.168.55.5, length 28
11:26:11.750215 ARP, Reply 192.168.55.4 is-at 02:42:c0:a8:37:04, length 28
11:26:12.750337 ARP, Request who-has 192.168.55.4 (02:42:c0:a8:37:04) tell 192.168.55.5, length 28
11:26:12.750353 ARP, Reply 192.168.55.4 is-at 02:42:c0:a8:37:04, length 28
{% endhighlight %}

ARP, FDB tables.

Containers from the same node communicate via br0, and MAC address learning works via broadcasts.
For containers running on different nodes the information is dynamically populated by Docker, see the `permanent` flag:
{% highlight bash %}
[vagrant@manager ~]$ sudo ip netns exec 1-qhmpedvga9 bridge fdb show
02:42:c0:a8:37:05 dev veth1 master br0 
02:42:c0:a8:37:04 dev veth0 master br0 
02:42:c0:a8:37:03 dev vxlan0 master br0 
02:42:c0:a8:37:03 dev vxlan0 dst 10.10.10.21 link-netnsid 0 self permanent
02:42:c0:a8:37:04 dev vxlan0 dst 10.10.10.21 link-netnsid 0 self permanent

[vagrant@manager ~]$ sudo ip netns exec 1-qhmpedvga9 ip neigh show
192.168.55.4 dev vxlan0 lladdr 02:42:c0:a8:37:04 PERMANENT
192.168.55.3 dev vxlan0 lladdr 02:42:c0:a8:37:03 PERMANENT
{% endhighlight %}

Since Docker manages fdb/arp entries on vxlan0, arp-learning is disabled and vxlan0 acts as arp-proxy (see the `proxy` flag):
{% highlight bash %}
[vagrant@manager ~]$ sudo ip netns exec 1-qhmpedvga9 ip -d link show vxlan0
21: vxlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue master br0 state UNKNOWN mode DEFAULT 
    link/ether 52:33:20:40:d1:d0 brd ff:ff:ff:ff:ff:ff link-netnsid 0 promiscuity 1 
    vxlan id 4097 srcport 0 0 dstport 4789 proxy l2miss l3miss ageing 300 
    bridge_slave addrgenmode eui64
{% endhighlight %}

![Docker Overlay Network Interfaces](/assets/images/docker_overlay_network.png)
