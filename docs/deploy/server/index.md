---
title: 常规部署
toc: menu
order: 2
nav:
  title: 部署
  order: 3
---
# 常规部署

## 准备工作

### 系统要求

<Alert type="info">

Linux内核版本 > 4.18，建议使用5.X版本的内核；内存 > 1GiB

</Alert>

例如 Tencent Server OS、Ubuntu20.04、Debian 最新版等等，不建议使用 Centos（终究是要停更的）。

**推荐使用更新版本的Linux内核，目前只有 Tencent Server OS 能用4.18 Linux 内核进行部署**

输入以下命令查看内核版本

```bash
uname -a
```

### 准备环境

安装宝塔面板，安装完成后进入软件商店—运行环境中

安装 `redis`、`mongoDB`、`pm2管理器` 。

## 开始部署

### 准备软件

首先我们安装必备的软件包

安装 `pnpm` , `yarn` ,`nrm `，`pm2`

```bash
npm install -g pm2 nrm pnpm yarn
```

验证安装是否完成

```bash
node -v
pm2 -v
pnpm -v
yarn -v
```

输出版本号即可。

切换源

```bash
nrm use npm
```

### 拉取仓库

**主仓库**

```bash
mkdir mx-space&&cd mx-space
git clone https://github.com/mx-space/server-next.git --depth 1 server
```

**镜像仓库**

```bash
mkdir mx-space&&cd mx-space
git clone https://github.com.cnpmjs.org/mx-space/server-next.git --depth 1 server
```

更换分支到最后一个稳定版本

```bash
cd server && git fetch --tags && git checkout $(git rev-list --tags --max-count=1) && cd ..
```

### 构建

进入`server` 目录

安装依赖

```bash
pnpm i
```

如果速度太慢，请使用`nrm`命令切换镜像源，例如

```bash
nrm use yarn
```

构建server

```bash
pnpm build
```

### 拉起&pm2托管

#### 拉起

先尝试手动拉起

```bash
node dist/src/main.js --jwtSecret=your_favorite_string
```

其中`your_favorite_string`是替换成你喜欢的内容并记录下来，例如

```bash
node dist/src/main.js --jwtSecret=bU2-sD4_fT2-qK3-dO2hN5+iY2mV7+
```

如果能正常拉起

大概返回如下内容

```bash
[Nest] 8394  - 11/24/2021, 12:49:33 PM     LOG [RouterExplorer] Mapped {/api/v2/snippets/:id, PUT} route +1ms
[Nest] 8394  - 11/24/2021, 12:49:33 PM     LOG [RouterExplorer] Mapped {/api/v2/snippets/:id, DELETE} route +1ms
[Nest] 8394  - 11/24/2021, 12:49:33 PM     LOG [NestApplication] Nest application successfully started +143ms
✔ Server listen on: http://127.0.0.1:2333                                                           11/24/21, 12:49:33
✔ Admin Dashboard: http://127.0.0.1:2333/qaqdmin                                                    11/24/21, 12:49:33
ℹ [MixSpaceServer]  Server is up. +3212ms                                                           11/24/21, 12:49:33
ℹ [ConfigsService]  Config 已经加载完毕！                                                           11/24/21, 12:49:33
ERROR  [MixSpaceServer]  邮件件客户端未认证                                                        11/24/21, 12:49:33

```

结束任务，我们继续

在`server`目录下找到`ecosystem.config.js`

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

保存即可

#### pm2托管

在该文件夹下，打开终端输入如下命令其一，使用pm2托管后端

```bash
yarn prod:pm2
pm2 start
```

## 后端部署完成

后端部署差不多了，请参照目录继续吧？

