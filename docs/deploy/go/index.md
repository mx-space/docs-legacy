---
title: 快速部署
toc: menu
order: 4

---
# 前后端&反代合集

> 这是模块分散恐惧党的福音，本节内容是之前内容的一个合集

## 准备环境

### 系统

Linux内核版本 >= 4.18，内存 > 1G

例如 Tencent Server OS、Ubuntu20.04、Debian 最新版等等，不建议使用 Centos（终究是要停更的）。

### 安装必备软件

首先，我们先去安装[宝塔面板](https://www.bt.cn/bbs/thread-19376-1-1.html)，用宝塔面板安装，`redis`、`mongodb`、`pm2管理器`（用于管理node.js）,`Nginx`。（在软件商店—运行环境中）

**以下所有步骤，为了避免权限问题，均以 root 执行**

安装git；

```bash
apt install git # debian系，例如Ubuntu等,以root权限执行
yum install git # centos
```

验证安装；

```bash
git --version
```

正常输出版本即可。

然后我们继续

```bash
npm install -g yarn pnpm zx nrm pm2
nrm ls # 列出可以使用的镜像源
nrm use npm # 当你的网络环境不好的时候，可以换成其他源。注意：不要用淘宝源！！！
# nrm use yarn
```

验证安装是否完成

```bash
node -v
yarn -v
pnpm -v
zx -v
pm2 -v
```

> Tip:如果pnpm和zx出现问题无法继续，请切换源！不要使用淘宝源。

正常输出版本号即可。

### 克隆repo

```bash
mkdir mx-space && cd mx-space
git clone https://github.com/mx-space/kami.git --depth 1
git clone https://github.com/mx-space/server-next.git --depth 1 server
```

**如果网络问题，拉取仓库太慢，试试下面的镜像仓库，或者选择给服务器~~科学上网~~**

```bash
mkdir mx-space && cd mx-space
git clone https://github.com.cnpmjs.org/mx-space/kami.git --depth 1
git clone https://github.com.cnpmjs.org/mx-space/server-next.git --depth 1 server
```

更换分支到最后一个稳定版本

```bash
cd kami && git fetch --tags && git checkout $(git rev-list --tags --max-count=1) && cd ..
cd server && git fetch --tags && git checkout $(git rev-list --tags --max-count=1) && cd ..
```

## 开始部署

###  准备域名

这边建议直接解析两或三个域名到服务器

> 本文中大量使用以下假设域名，请按此替换成你配置的域名。

> 假设解析的是：
>
> 前端： kami.test.cn
>
> 后端： server.test.cn

### 准备站点

在宝塔面板依次添加 `前端` 、`后端`，填入自己的域名（即自己准备的前端，后端域名）

**请自行部署好 SSL 证书，该部分内容在前面提到过。**

## 部署server（后端）

这里就用宝塔简化步骤，只需要很少命令

宝塔面板—文件—根目录—root—mx-space—server

文件这一页面内就有终端，点击终端（自己输入自己的root账户及密码）

### 开始构建

在 `server` 目录下；

```bash
pnpm i # 安装依赖，因网络环境差异可能速度不一样，可以通过切换源来解决，但！不要用淘宝源
pnpm build
```

> Tip：可能第一步的install不成功，可以多试几次。

先手动拉起；

```bash
node dist/src/main.js --jwtSecret=your_favorite_string
```

`your_favorite_string` 这串值换成自己喜欢的，并记录下来。

```shell
[Nest] 8394  - 11/24/2021, 12:49:33 PM     LOG [RouterExplorer] Mapped {/api/v2/snippets/:id, PUT} route +1ms
[Nest] 8394  - 11/24/2021, 12:49:33 PM     LOG [RouterExplorer] Mapped {/api/v2/snippets/:id, DELETE} route +1ms
[Nest] 8394  - 11/24/2021, 12:49:33 PM     LOG [NestApplication] Nest application successfully started +143ms
✔ Server listen on: http://127.0.0.1:2333                                                           11/24/21, 12:49:33
✔ Admin Dashboard: http://127.0.0.1:2333/qaqdmin                                                    11/24/21, 12:49:33
ℹ [MixSpaceServer]  Server is up. +3212ms                                                           11/24/21, 12:49:33
ℹ [ConfigsService]  Config 已经加载完毕！                                                           11/24/21, 12:49:33
ERROR  [MixSpaceServer]  邮件件客户端未认证                                                        11/24/21, 12:49:33
```

Ctrl+C结束任务，如果没有问题的话我们继续。

编辑目录下 `ecosystem.config.js`

将其中的内容替换为如下内容

```javascript
module.exports = {
  apps: [
    {
      name: 'mx-server',
      script: 'dist/src/main.js',
      autorestart: true,
      exec_mode: 'cluster',
      watch: false,
      instances: 2,
      max_memory_restart: '230M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
```

进入`src`目录

编辑 `app.config.js`

在13行左右，你会发现如下内容；

```javascript
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

那么想必聪明的你知道要干啥了，把域名/地址换成自己的，多余的删掉（不删也行，删掉最好）

在 55 行左右你会发现如下内容；

```typescript
exports.SECURITY = {
  jwtSecret: argv.jwt_secret || argv.jwtSecret || 'asjhczxiucipoiopiqm2376',
  jwtExpire: '7d',
```

刚刚让你自己记的那串值就用上了，把 `asjhczxiucipoiopiqm2376` 换成自己的，保存文件即可。

然后重新进行构建；

```bash
pnpm build
```

使用PM2托管；

```bash
yarn prod:pm2
# pm2 start ecosystem.config.js
```

观察后端是否正常拉起；

```bash
pm2 logs
```

如果日志正常，则继续。

### 反代后端

进入宝塔面板—网站，设置后端网站（server.test.cn)

点击 `反向代理`—`添加反向代理`

![server-daili](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/server-daili.png)

代理名称随便填，目标URL`http://127.0.0.1:2333`，发送域名`$host` ，其他的不用填，提交保存即可。

然后我们点击左侧的 `配置文件`（网站设置）

在 `access_log` 字段上面，添加如下配置；

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

可以通过 curl 测试一下接口访问；

```bash
curl https://server.test.cn/api/v2 -H "user-agent: any"
```

输出如下示例内容；

```json
{"name":"server-next","author":"Innei <https://innei.ren>","version":"3.11.2","homepage":"https://github.com/mx-space/server-next#readme","issues":"https://github.com/mx-space/server-next/issues","hash":""}
```

可以认为正常。

接下来，我们可以去后台看看。

打开浏览器输入 https://server.test.cn/qaqdmin 第一次使用会进行注册，注册完成后，重新打开后台，登录即可。

稍稍设置一下，继续下一步。

**可以尝试添加一篇测试博文、日记，友链，方便后期排错。**

## 部署前端

进入mx-space—kami文件夹，

新建一个名为 `.env` 文件 或者 执行该命令 `cp .env.example .env` ；

添加/编辑，如下内容（没有就加上去)；

```bash
NEXT_PUBLIC_APIURL=https://server.test.cn/api/v2     # server端的API地址
NEXT_PUBLIC_GATEWAY_URL=https://server.test.cn     # server端地址
NEXT_PUBLIC_TRACKING_ID=G-*******          # 改为自己的Google分析ID
NEXT_PUBLIC_ALWAYS_HTTPS=1
NETEASE_PHONE=159*******4               # 网易云手机号
NETEASE_PASSWORD=bcc*******          # 网易云密码
```


### 开始构建

在 `kami` 目录下；

```bash
pnpm i
pnpm build
```

构建完成，尝试拉起kami(前端)，以下命令二选其一

```bash
yarn prod:pm2
pm2 start
```

没有报错的情况下，设置前端反代。

### 反代前端

点击网站—网站，设置前端网站（kami.test.cn），

点击 `反向代理` — `添加反向代理` 

![kami-daili](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/kami-daili.png)

代理名称随便填，目标URL `http://127.0.0.1:2323` ，发送域名 `$host` ，其他的不用填，提交保存即可。

接下来输入 https://kami.test.cn/ 看看是否正常惹。

如果没问题，继续。

### 修改kami的部分文件

**解释一下文件的大致作用吧**

- `configs.ts` 顾名思义就是设置，你可以修改首页的GitHub，QQ等链接，以及备案号，照着作者的修改就行。
- `manifest.json` 主要是标题问题。
- `_document.tsx` 主要是` <meta> ` ,同时  ` <mete>` 类型的验证可以通过修改这里进行。

在kami根目录下找到 `configs.ts` 文件;

- 编辑 `configs.ts` 文件，大约在105行左右的位置，把下面的内容根据作者的示例，换成自己的。（主要替换url） 有备案号的换成自己的，替换完成，保存。

进入kami中 `public` 文件夹；

- 编辑 `manifest.json` 文件，把内容换成自己的，保存即可。

进入kami中 `pages` 文件夹；

- 编辑 `_document.tsx` 文件，大约在48行左右的位置，看见 `“静かな森” `没？ 想必聪明的你知道该干什么了吧？把作者的换成自己的，保存即可。

然后重新构建；

```bash
pnpm build
yarn prod:pm2
```

pm2那个命令也可以用，效果一样，就不赘述了。

## 部署完成后一些操作

### 新建留言/关于页

- 新建页面，留言页填为message
- 新建页面，关于页填为about

或者自行修改 `configs.ts` 的地址

快速配置完成，请尽情享受吧！
