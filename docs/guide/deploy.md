---
toc: menu
order: 4
---
# 部署

## 序

开始之前，你需要准备的东西：

- 一台服务器或者其他任意 Linux 的机子（这里推荐使用 Ubuntu 18+）
- 一个好的网络环境
- 一个聪明且善于思考问题的大脑

假设以上条件都已经具备，让我们开始吧。

首先连接上你的服务器，你需要有如下环境。

- Redis
- MongoDB (with mongodb-tools)
- Node 16.6+
- Git, curl, zip, unzip

## 快速部署服务

快速部署暂时只支持 Ubuntu 18+，Server 端无需自行构建

不是 Ubuntu 18+ 的可以绕道了。可以跳过这个一节。

```bash
cd
mkdir -p mx
mkdir -p ~/.mx-space/log/
cd mx
npm i -g zx pm2
npm init -y
npm i zx
wget -O server-deploy.js https://cdn.jsdelivr.net/gh/mx-space/server-next@master/scripts/deploy.js
node server-deploy.js --jwtSecret=please_change_this_value # 注意修改一下 这个 jwtSecret. 值可以随机数字字母, 不要用示例值
```

如果没有问题的话, 你将会看到如下输出

```bash
$ cd /root/mx
$ fetch https://api.github.com/repos/mx-space/server-next/releases/latest
$ fetch https://small-lake-9960.tukon479.workers.dev/https://github.com/mx-space/server-next/releases/download/v3.6.5/release-ubuntu.zip
$ rm -rf ./run
$ unzip /tmp/9.ff7f513a5f16.zip -d ./run
Archive:  /tmp/9.ff7f513a5f16.zip
   creating: ./run/assets/
  inflating: ./run/assets/markdown.css
   creating: ./run/assets/email-template/
  inflating: ./run/assets/email-template/owner.template.ejs
  inflating: ./run/assets/email-template/guest.template.ejs
  ...这里省略
$ rm /tmp/9.ff7f513a5f16.zip
$ cd ./run
$ export NODE_ENV=production
$ pm2 reload ecosystem.config.js -- --jwtSecret=please_change_this_value
[PM2] Applying action reloadProcessId on app [mx-server](ids: [ 0, 1 ])
[PM2] [mx-server](0) ✓
[PM2] [mx-server](1) ✓
等待 15 秒
$ lsof -i:2333 -P -n | grep LISTEN
PM2\x20v5 1983 root   20u  IPv4  32210      0t0  TCP *:2333 (LISTEN)
```

可以通过 curl 测试一下接口访问

```bash
$ curl http://localhost:2333/api/v2 -H "user-agent: any"
```

输出

```json
{"name":"server-next","author":"Innei <https://innei.ren>","version":"3.6.5","homepage":"https://github.com/mx-space/server-next#readme","issues":"https://github.com/mx-space/server-next/issues","hash":""}#
```

即成功.

通过外网访问

![ZuyQ21](https://raw.githubusercontent.com/mx-space/docs-images/master/images/ZuyQ21.png)

接下来登陆后台面板, 安全起见目前只能通过直接调用接口的形式实现注册, 或者本地端口转发访问面板.


在本机打开终端, 注意不是服务器上

```bash
ssh -f -N -L 2333:localhost:2333 username@host
```

使用 SSH 端口转发，把远程 2333 转发到本地 2333，浏览器打开 `http://localhost:2333/#/qaqdmin/setup`

![aRFCnf](https://raw.githubusercontent.com/mx-space/docs-images/master/images/aRFCnf.png)

注册完成后即可进入面板，建议先设置个人信息和系统设置，[下一节](/guide/setting)将展开讲讲系统设置。

## 常规部署

此节适合非 Ubuntu 的机器，首先还是要拉代码。参考如下

```bash
cd
mkdir -p mx
cd mx
git clone https://github.com/mx-space/server-next.git --depth 1 server
cd server && git fetch --tags && git checkout $(git rev-list --tags --max-count=1)
pnpm i
pnpm build
node dist/src/main.js --jwtSecret=please_change_this_value # 注意修改一下 这个 jwtSecret. 值可以随机数字字母, 不要用示例值
```
不出意外的话，出现这样的就 ok 了。

```bash
[Nest] 91773  - 09/19/2021, 7:54:40 PM     LOG [CacheService] Redis 已准备好！
[Nest] 91773  - 09/19/2021, 7:54:40 PM     LOG [NestApplication] Nest application successfully started
[Nest] 91773  - 09/19/2021, 7:54:40 PM   DEBUG OpenApi: http://localhost:2333/api-docs
[Nest] 91773  - 09/19/2021, 7:54:40 PM   DEBUG GraphQL playground: http://localhost:2333/graphql
[Nest] 91773  - 09/19/2021, 7:54:40 PM     LOG Server is up.
[Nest] 91773  - 09/19/2021, 7:54:40 PM     LOG [ConfigsService] Config 已经加载完毕！
```

当然你也可以用 PM2 去托管应用，在此不做介绍。参考命令：

```bash
pm2 start ecosystem.config.js -- --jwtSecret=please_change_this_value # 注意修改一下 这个 jwtSecret. 值可以随机数字字母, 不要用示例值
```

## 使用 Docker 部署服务

这一 Part 需要等我有时间去学习 Docker 再写了。