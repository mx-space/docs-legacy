---
title: 介绍
toc: menu
order: 1
nav:
  title: 指南
  order: 1
---

# 介绍

这是一个与众不同的船行的个人空间，参见「[特征](./feature)」

## 本地调试与开发

由于是前后端分离，本地开发环境或许有点复杂。但是相信聪明的你一定可以。

### 环境准备

首先得有 node，并确保 node 版本是 16.6.0 或以上。其他版本未测试，理论比这个高的版本就没有问题。

安装 node 推荐使用 [nvm](https://github.com/nvm-sh/nvm)。

需要安装有 Redis，和 [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

可以使用如下命令检查一下：

```bash
$ mongo --version
$ redis-cli -v
```

案例输出

```
$ mongo --version
MongoDB shell version v5.0.1
Build Info: {
    "version": "5.0.1",
    "gitVersion": "318fd9cabc59dc9651f3189b622af6e06ab6cd33",
    "modules": [],
    "allocator": "system",
    "environment": {
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
}

$ redis-cli -v
redis-cli 6.2.5
```

还需要装有 mongodb-tools 用于数据库备份，一般和 mongo 捆绑。可以用这个命令看一下装没装。

```bash
$ mongodump --version
```

```
mongodump version: 100.4.0
git version: 8e725325b4bb650c0b00a5e000fdaae67ac73c67
Go version: go1.16.3
   os: darwin
   arch: amd64
   compiler: gc
```

还需要安装有 zip，unzip 用于打包备份。

总结一下需要的环境有：

- Redis
- MongoDB (with mongodb-tools)
- Node 16.6+
- zip, unzip

### 起程

准备好了上面的环境之后就可以把代码搞下来了。克隆代码用 Git 就行了，虽然上面没写，但是不会有人没有装这个吧。这个都不会这么装的可以自行谷歌了。

```bash
mkdir mx-space
git clone https://github.com/mx-space/kami.git --depth 1
git clone https://github.com/mx-space/admin-next.git --depth 1 admin
git clone https://github.com/mx-space/server-next.git --depth 1 server

# 以下可选，但是建议，更换分支到最后一个稳定版本
cd kami && git fetch --tags && git checkout $(git rev-list --tags --max-count=1) && cd ..
cd admin && git fetch --tags && git checkout $(git rev-list --tags --max-count=1) && cd ..
cd server && git fetch --tags && git checkout $(git rev-list --tags --max-count=1) && cd ..
```

接下来还需要安装 pnpm，可以使用 npm 安装。

```bash
npm i -g pnpm
```

安装各个项目依赖。

```bash
cd kami && pnpm i && cp .env.example .env && cd ..
cd admin && pnpm i && cd ..
cd server && pnpm i && cd ..

```

完成之后可以先跑一下服务端，在此之前请确保 Mongo 和 Redis 已经正常工作。

```bash
cd server && npm run start

```

待一切就绪之后，你应该会看到如下提示。

```
[Nest] 91773  - 09/19/2021, 7:54:40 PM     LOG [CacheService] Redis 已准备好！
[Nest] 91773  - 09/19/2021, 7:54:40 PM     LOG [NestApplication] Nest application successfully started
[Nest] 91773  - 09/19/2021, 7:54:40 PM   DEBUG OpenApi: http://localhost:2333/api-docs
[Nest] 91773  - 09/19/2021, 7:54:40 PM   DEBUG GraphQL playground: http://localhost:2333/graphql
[Nest] 91773  - 09/19/2021, 7:54:40 PM     LOG Server is up.
[Nest] 91773  - 09/19/2021, 7:54:40 PM     LOG [ConfigsService] Config 已经加载完毕！
```

访问 `http://localhost:2333/api-docs` 就可以看到所有的 REST API 了，已 Swagger 形式呈现。

也可以访问 `http://localhost:2333/graphql` 进入 GraphQL Playground。

进入 `http://127.0.0.1:2333/qaqdmin` 可以进入后台管理。

第一次进入会出现注册界面

![](https://raw.githubusercontent.com/mx-space/docs/master/images/8IRwDD.png)

操作完成后，进入后台设置面板，调整设置。

![u8Vxb3](https://raw.githubusercontent.com/mx-space/docs-images/master/images/u8Vxb3.png)

接下来，启动前端开发环境。

```bash
cd kami
npm run start
```

等待片刻后，你将会看到空空的首屏。

![VcCkvn](https://raw.githubusercontent.com/mx-space/docs-images/master/images/VcCkvn.png)

你可以在后台发布内容后，在访问主站。

### 开发指南

启动服务端后，访问 <http://localhost:2333/api-docs> 进入 Swagger UI，所有的可用的接口在此列出。可以按需进行调试。

![mqjHgr](https://raw.githubusercontent.com/mx-space/docs-images/master/images/mqjHgr.png)
