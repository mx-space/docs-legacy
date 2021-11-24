---
toc: menu
order: 4
---

# 部署

<Alert type="info">
<p>如果你是一个爱折腾的人，可以从头开始阅读，并动手尝试，途中你会遇到很多有挑战的事情，也能收获很多。如果你不想折腾，可以直接阅读最后一节 Docker 部署。</p>
</Alert>

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
- Git，curl，zip，unzip，zx

<Alert type="info">
<p>
Git，curl，zip，unzip 可以通过每个发行版 Linux 自带的包管理器安装。
zx 可以通过 `npm i -g zx` 全局安装
</p>
</Alert>

## 快速部署服务

~~快速部署暂时只支持 Ubuntu 18+，Server 端无需自行构建~~

~~不是 Ubuntu 18+ 的可以绕道了。可以跳过这个一节。~~

经过测试 CentOS 也是可行的，理论 Linux 应该都是可行的，只要内核版本不低于 4.18 应该都行，欢迎继续测试支持的最低版本。

```bash
cd
mkdir -p mx
mkdir -p ~/.mx-space/log/
cd mx
npm i -g zx pm2
npm init -y
npm i zx
wget -O server-deploy.js https://cdn.jsdelivr.net/gh/mx-space/server-next@master/scripts/deploy.js
node server-deploy.js --jwtSecret=please_change_this_value --allowed_origins=your_site # 注意修改一下 这个 jwtSecret. 值可以随机数字字母，不要用示例值，以及修改 allowed_origins，详细在下面一行
```

在`node server-deploy.js`步骤中，出现了两个args，一个是 jwtSecret，一个是 allowed_origins，`jwtSecret` 随机值即可，但是 `allowed_origins` 后你需要填上你的前端地址，如果有后台的话也要填上后台的地址，**以下是示例**：（里面加上了baidu.com的原因是我的百度资源平台抓取sitemap会提示无法抓取，给了baidu.com allow就行了，不一定其他人都是这样的）

```bash
node dist/src/main.js --jwtSecret=bU2-sD4_fT2-qK3-dO2hN5+iY2mV7+ --allowed_origins=iucky.cn,cli.iucky.cn,baidu.com
```

如果没有问题的话，你将会看到如下输出

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

接下来登陆后台面板，安全起见目前只能通过直接调用接口的形式实现注册，或者本地端口转发访问面板.

在本机打开终端，注意不是服务器上

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
node server-deploy.js --jwtSecret=please_change_this_value --allowed_origins=your_site # 注意修改一下 这个 jwtSecret. 值可以随机数字字母，不要用示例值，以及修改 allowed_origins，详细在下面一行
```

在`node server-deploy.js`步骤中，出现了两个args，一个是 jwtSecret，一个是 allowed_origins，`jwtSecret` 随机值即可，但是 `allowed_origins` 后你需要填上你的前端地址，如果有后台的话也要填上后台的地址，**以下是示例**：（里面加上了baidu.com的原因是我的百度资源平台抓取sitemap会提示无法抓取，给了baidu.com allow就行了，不一定其他人都是这样的）

```bash
node dist/src/main.js --jwtSecret=bU2-sD4_fT2-qK3-dO2hN5+iY2mV7+ --allowed_origins=iucky.cn,cli.iucky.cn,baidu.com
```


不出意外的话，出现这样的就 ok 了。

```bash
[Nest] 91773  - 09/19/2021，7:54:40 PM     LOG [CacheService] Redis 已准备好！
[Nest] 91773  - 09/19/2021，7:54:40 PM     LOG [NestApplication] Nest application successfully started
[Nest] 91773  - 09/19/2021，7:54:40 PM   DEBUG OpenApi: http://localhost:2333/api-docs
[Nest] 91773  - 09/19/2021，7:54:40 PM   DEBUG GraphQL playground: http://localhost:2333/graphql
[Nest] 91773  - 09/19/2021，7:54:40 PM     LOG Server is up.
[Nest] 91773  - 09/19/2021，7:54:40 PM     LOG [ConfigsService] Config 已经加载完毕！
```

当然你也可以用 PM2 去托管应用，在此不做介绍。参考命令：

```bash
pm2 start ecosystem.config.js -- --jwtSecret=please_change_this_value # 注意修改一下 这个 jwtSecret. 值可以随机数字字母，不要用示例值
```
注：如果使用该命令，请在`ecosystem.config.js`文件中第5行  `script: index.js` 的`index.js`修改为`dist/src/main.js`,如果你修改了`app.config.js`（这个注解在下面） ，命令示例
```bash
    pm2 start ecosystem.config.js
或  yarn prod:pm2
```
### 更详细的过程
如果你需要详细的部署过程，请看这里[新手从零开始的部署](/guide/0_to_install_mx-space)
## 使用 Docker 部署服务

```bash
cd
mkdir -p mx/server
cd mx/server
wget https://cdn.jsdelivr.net/gh/mx-space/server-next@master/docker-compose.yml
docker-compose up -d
```

你可以使用 `docker-compose pull && docker-compose up -d` 更新到最新的镜像。

## 使用 Docker Compose 部署整个系统

详见 <https://github.com/mx-space/docker#readme>

## 从零开始的部署过程

假设现在你有一台 Ubuntu 的服务器。还没有安装任何环境。并且你已经将域名解析到了服务器。复制以下脚本运行。

```bash
sudo apt update && sudo apt install git curl vim wget -y
curl -fsSL https://get.docker.com | bash -s docker
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm install node
npm i -g yarn zx pnpm

mkdir -p mx
cd mx
git clone https://github.com/mx-space/docker --depth=1
cd docker
zx ./build.js
```
## 补充说明
### 每次修改后的操作
注：当你对服务端每次进行修改过后，要重新进行部署过程，以常规部署举例
```
pnpm i
pnpm build
yarn prod:pm2 
```
这样才会让修改生效

### CORS问题的一种解决办法/不想带上一大串参数的
请看示例代码
```bash
node dist/src/main.js --jwtSecret=bU2-sD4_fT2-qK3-dO2hN5+iY2mV7+ --allowed_origins=iucky.cn,cli.iucky.cn,baidu.com
```
如果你不想带上一串参数，请在src目录中修改`app.config.js`文件，第15行下面的域名/地址改成自己的，第55行的`asjhczxiucipoiopiqm2376`改成你喜欢的随机值。
示例如下：
```bash
    ? argv.allowed_origins?.split?.(',') || []
    : [
        'www.timochan.cn',                  //改这里
        'baidu.com',

      ],
  // allowedReferer: 'innei.ren',
}
exports.SECURITY = {
  jwtSecret: argv.jwt_secret || argv.jwtSecret || 'asjhczxiucipoiopiqm2376', //改这里的
```
修改过后记得重新构建一下惹。

示例代码
```bash
pm2 start ecosystem.config.js -- --jwtSecret=please_change_this_value # 注意修改一下 这个 jwtSecret. 值可以随机数字字母，不要用示例值
```
注：如果使用该命令，请在`ecosystem.config.js`文件中第5行  `script: index.js` 的`index.js`修改为`dist/src/main.js`,如果你修改了`app.config.js`（这个注解在上面） 那么，可以这样做，命令示例
```bash
    pm2 start ecosystem.config.js
或  yarn prod:pm2
```
