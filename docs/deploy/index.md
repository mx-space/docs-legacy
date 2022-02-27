---
title: 部署
toc: menu
order: 1
nav:
  title: 宝塔环境快速部署
  order: 1
--- 


# 基于宝塔环境的部署

## 准备环境

## 域名解析

国内服务器请完成备案后再进行。

本文档示例域名：

`Mx-Server : server.test.cn`

`kami : www.test.cn`

### 系统

<Alert type="info">

Linux 内核版本 > 4.18，建议使用 5.X 版本的内核；内存 > 1GiB

</Alert>

例如 Tencent Server OS、Ubuntu20.04、Debian 最新版等等，不建议使用 CentOS（终究是要停更的）。

**推荐使用更新版本的 Linux 内核，目前只有 Tencent Server OS 能用 4.18 版本的内核进行部署**

### 安装面板

安装[宝塔面板](https://www.bt.cn/bbs/thread-19376-1-1.html)，在宝塔面板—软件商店，安装  `pm2管理器` ，`Nginx`。

Debian / Ubuntu
```bash
sudo apt update && sudo apt install git curl vim wget -y
```

Redhat 系同理。



```bash
npm install -g pnpm yarn pm2

#如果安装比较慢，可以试试下面的命令
npm config set registry http://mirrors.cloud.tencent.com/npm/
```




### 安装 docker 



```bash
curl -fsSL https://get.docker.com | bash -s docker
```



### 安装 docker-compose

```bash
#下载 docker-compose
wget https://shrill-pond-3e81.hunsh.workers.dev/https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-linux-x86_64
# 复制到指定位置
sudo cp ./docker-compose-linux-x86_64  /usr/local/bin/docker-compose
# 赋予执行权限
sudo chmod +x /usr/local/bin/docker-compose
# 设置软链接
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

检查是否安装完成

```bash
docker-compose --version
```

正常输出版本号即可。

## 安装 Mx-Server

### 准备

为了方便管理建议将 `docker-compose.yml` 放到 `mx-space/server` 下

```bash
cd

mkdir -p mx-space/server

cd mx-space/server

wget https://cdn.jsdelivr.net/gh/mx-space/server-next@master/docker-compose.yml

wget https://cdn.jsdelivr.net/gh/mx-space/server-next@master/.env.example -O .env
```

用宝塔或者 `vim` 编辑这个  `.env ` 文件，文件示例如下

```env
# THIS ENV FILE EXAMPLE ONLY FOR DOCKER COMPOSE
# SEE https://docs.docker.com/compose/environment-variables/#the-env-file
JWT_SECRET=aaa                       #此处填写一个随意字符串，示例如：aaa
ALLOWED_ORIGINS=test.cn,www.test.cn  #此处填写被允许的域名，通常是kami的域名，如果允许多个域名访问，用英文逗号,分隔
```

### 生成容器

```bash
#拉取最新镜像
sudo docker-compose pull
#生成容器
sudo docker-compose up -d
```

## 安装 kami

### 拉取源文件

```bahs
cd
cd mx-space
git clone https://github.com/mx-space/kami.git
#网络不好的情况，请使用下面的
git clone https://github.com.cnpmjs.org/mx-space/kami.git
```

更换分支到最后一个稳定版本

```bash
cd kami && git fetch --tags && git checkout $(git rev-list --tags --max-count=1) 
```

执行该命令
```bash
 cp .env.example .env
```

编辑，示例如下：

```env
# API 地址
NEXT_PUBLIC_APIURL=https://server.test.cn/api/v2
# GATEWAY 地址
NEXT_PUBLIC_GATEWAY_URL=https://server.test.cn
#前端使用的配置项名字
NEXT_PUBLIC_SNIPPET_NAME=kami
# 网易云手机号
NETEASE_PHONE=155*********
# 网易云密码
NETEASE_PASSWORD=awdwadawdawd*****
# 如果使用 CDN, 修改产物前缀
ASSETPREFIX=
```

保存即可。

### 安装依赖

```bash
pnpm i
```

### 构建

```bash
pnpm build
#备用命令
npm run build
```

### pm2托管（启动）

```bash
yarn prod:pm2
#pm2 start
```

## 反向代理

### Mx-Server

进入宝塔面板—网站，新建并设置后端网站（server.test.cn)

点击 `反向代理`—`添加反向代理`

代理名称随便填，目标 URL `http://127.0.0.1:2333`，发送域名 `$host` ，其他的不用填，提交保存即可。

![](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/server-daili.png)

然后我们点击左侧的 `配置文件`（网站设置）

在 `access_log` 字段上面，添加如下配置:

```nginx
location /socket.io {
    proxy_http_version 1.1;
    proxy_buffering off;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_pass http://127.0.0.1:2333/socket.io;
}
```

保存即可。

那么局部配置文件示例如下：

```nginx
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

### 访问后台

后台地址： https://域名/qaqdmin

访问后台进行初始化。

### Kami

点击网站—网站，设置前端网站（www.test.cn），

点击 `反向代理` — `添加反向代理`

代理名称随便填，目标 URL `http://127.0.0.1:2323` ，发送域名 `$host` ，其他的不用填，提交保存即可。

![](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/kami-daili.png)

接下来访问 https://www.test.cn/  ，看看是否正常惹。

## 后台设置

该节内容在  [后台设置](/setting/adsetting)

## 搜索

kami V3 已经搜索功能已经完成，具体配置方法请参考[后台设置-algolia](/setting/adseting#algolia-search)。

## Kami设置

该节内容在 [Kami v3设置](/setting)
