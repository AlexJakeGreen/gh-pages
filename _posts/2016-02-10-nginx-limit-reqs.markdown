---
layout: post
title:  "Limit requests in nginx"
date:   2016-02-10
categories: nginx
---

```
limit_req_zone $http_x_forwarded_for zone=search:10m rate=1r/m;
limit_req_zone $binary_remote_addr zone=perip:10m rate=1r/m;
limit_req_zone $server_name zone=perserver:10m rate=1r/m;
limit_req_status 498;
error_page 498 = @limitreached;
server {
    listen 8080;
    server_name _;
    #limit_req zone=search burst=1;
    limit_req zone=perip burst=5 nodelay;
    #limit_req zone=perserver burst=10;
    location @limitreached {
      rewrite ^ /limitreached.html;
    }
}
```
