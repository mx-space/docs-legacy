---
title: 后端反向代理
toc: menu
order: 5
nav:
  title: 部署
  order: 3
---


# 后端反向代理

> 本节将带你进行后端的反向代理，内容相对比较偏向新手，如果您觉得啰嗦，可以跳过一部分。

## 准备

### 域名

我们假设准备了一个 `server.test.cn` 的域名，作为公网部署后的域名。

### web端

> 本节暂时以nginx作为示例，caddy稍后补充

打开宝塔面板，进入软件商店-运行环境，安装 `nginx` 。

稍稍等待安装完成。

#### 新建站点

为你的后端添加一个站点。

### SSL证书

鉴于前端强制HTTPS，还是把部署SSL证书单独拿出来讲。

#### 申请SSL证书

宝塔自身提供申请SSL证书的接口，如果你比较懒，使用这个就行，这里不再赘述。

当然，申请SSL证书的方式多种多样，包括但不仅限于这一种。

#### 部署SSL证书

如果你使用的是宝塔的接口，这里就不用看了。

如果你是手动申请的证书，请点击 `server.test.cn` 该站点的 `设置`-`SSL`

点击其他证书，分别把申请到的证书的公钥和私钥分别填写，保存即可。

## 开始

### 设置反向代理

点击后端站点的设置，点击 `反向代理`—`添加反向代理`

代理名称随便填，目标URL `http://127.0.0.1:2333`，发送域名 `$host` ，其他的不用填，提交保存即可。

示例如下

![server-daili.png (699×519) (jsdelivr.net)](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/server-daili.png)

### 修改站点配置文件

点击 `设置`—`配置文件`

找到 `access_log` 这个字段

在这个字段上面添加如下内容

```conf
location /socket.io {
    proxy_http_version 1.1;
    proxy_buffering off;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_pass http://127.0.0.1:2333/socket.io;
}
```

那么局部配置文件示例应该如下，这个不用抄。

```conf
location /socket.io {
    proxy_http_version 1.1;
    proxy_buffering off;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_pass http://127.0.0.1:2333/socket.io;
}
    access_log  /www/wwwlogs/server.test.cn.log;
    error_log  /www/wwwlogs/server.test.cn.log;
}
```

保存即可，重启 `nginx` 。

### 修改文件

> 该部分的修改，仅常规部署需要进行。

进入 `src` 目录，编辑 `app.config.js`,

在13行左右，你会发现如下内容；

```typescript
allowedOrigins: argv.allowed_origins
    ? argv.allowed_origins?.split?.(',') || []
    : [
        'innei.ren',
        'shizuri.net',
        'localhost:9528',
        'localhost:2323',
        '127.0.0.1',
        'mbp.cc',
        'local.innei.test',
        '22333322.xyz',
      ],
  // allowedReferer: 'innei.ren',
}
```

那么想必聪明的你知道要干啥了，把域名/地址换成自己的，多余的删掉（不删也行，删掉最好）。

在55行左右你会发现如下内容；

```typescript
exports.SECURITY = {
  jwtSecret: argv.jwt_secret || argv.jwtSecret || 'asjhczxiucipoiopiqm2376',
  jwtExpire: '7d',
```

之前步骤中让你自己记的那串值(`your_favorite_string`)就用上了，把 `asjhczxiucipoiopiqm2376` 换成自己的，保存文件即可。

修改完成，我们重现构建一下
```bash
pnpm build
yarn prod:pm2
```

## 完成

后端反向代理完成，打开浏览器访问https://server.test.cn/api/v2 试试，如果没问题

应该返回如下信息；

```json
{"name":"server-next","author":"Innei <https://innei.ren>","version":"3.11.2","homepage":"https://github.com/mx-space/server-next#readme","issues":"https://github.com/mx-space/server-next/issues"}
```

本节内容完成，请参照目录，继续下节内容。
