
# 从零开始的手动部署

##  前言
代码块中 //  后面的内容为注释内容，不用抄上去。

（）内的内容为补充内容，可以看看
## 准备环境
系统环境：centos7,ubuntu（只要是宝塔支持的比较好的Linux版本都可以）

首先，我们先去安装[宝塔面板](https://www.bt.cn/bbs/thread-19376-1-1.html)，用宝塔面板安装，
`redis`、`mongodb`、`pm2管理器`（用于管理node.js）,`Nginx`。（在软件商店—运行环境中）

注意：服务器内存必须大于1G，否则将可能出现内存溢出问题。如果不满足，请自行参考[云构建](/guide/web#%E4%BA%91%E6%9E%84%E5%BB%BA)

当然，大佬可以忽略安装宝塔面板这一步


### 安装必备软件

**以下所有步骤，为了避免权限问题，均以root执行**

安装git
```bash
apt install git //centos
yum install git //debian系，例如Ubuntu等
```
验证安装
```bash
git --version
```
正常输出版本即可

安装node.js16，如果预装有node16，可以忽略该步，理论上node16.6.X以上版本没问题。

```bash
nvm install 16.6.1

nvm alias default  v16.6.1
```

然后我们继续

```bash
npm install -g yarn pnpm zx nrm pm2

nrm ls //列出可以使用的镜像源

nrm use npm //当你的网络环境不好的时候，可以换成其他源。注意：不要用淘宝源！！！

例如
nrm use yarn
```

验证安装是否完成

```bash
node -v

yarn -v

pnpm -v

zx -v

pm2 -v
```

正常输出版本号即可。

### 克隆repo

```bash
mkdir mx-space&&cd mx-space
git clone https://github.com/mx-space/kami.git --depth 1
git clone https://github.com/mx-space/admin-next.git --depth 1 admin //可选
git clone https://github.com/mx-space/server-next.git --depth 1 server
```

**如果网络问题，拉取仓库太慢，试试下面的镜像仓库**

```bash
mkdir mx-space&&cd mx-space
git clone https://gitee.com/a1435241/kami.git --depth 1
git clone https://gitee.com/a1435241/admin-next.git --depth 1 admin //可选
git clone https://gitee.com/a1435241/server-next.git --depth 1 server
```

更换分支到最后一个稳定版本

```bash
cd kami && git fetch --tags && git checkout $(git rev-list --tags --max-count=1) && cd ..
cd admin && git fetch --tags && git checkout $(git rev-list --tags --max-count=1) && cd .. 			//可选
cd server && git fetch --tags && git checkout $(git rev-list --tags --max-count=1) && cd ..
```

## 开始部署

### 准备域名

这边建议直接解析三个域名到服务器

这里假设解析的是：

前端： kami.test.cn

中端： admin.test.cn 	//可选

后端： server.test.cn

**如果你自己不会排错，那么请自行部署好SSL证书，国内服务器，请备案以后再进行操作。**
### 准备站点

在宝塔面板依次添加`前端` 、`后端`，域名自己填（即自己准备的前端，后端域名）

## 部署server（后端）

这里就用宝塔简化步骤，只需要很少命令

宝塔面板—文件—根目录—root—mx-space—server

文件这一页面内就有终端，点击终端（自己输入自己的root账户及密码）

### 开始构建
在`server`目录下
```bash
pnpm i //安装依赖，因网络环境差异可能速度不一样，可以通过切换源来解决，但！不要用淘宝源
pnpm build
```

注意：可能第一步的install不成功，可以多试几次

先手动拉起

```bash
node dist/src/main.js --jwtSecret=bU2-sD4_fT2-qK3-dO2hN5+iY2mV7+
```

`bU2-sD4_fT2-qK3-dO2hN5+iY2mV7+`这串值换成自己喜欢的，并记录下来。

Ctrl+C结束任务，如果没有问题的话我们继续。

编辑目录下`ecosystem.config.js`

将第五行的 `index.js` 更改为 `dist/src/main.js`，保存即可。

进入`src`目录

编辑`app.config.js`

在13行左右，你会发现如下内容

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

那么想必聪明的你知道要干啥了，把域名/地址换成自己的，多余的删掉（不删也行，删掉最好）

在55行左右你会发现如下内容

```typescript
exports.SECURITY = {
  jwtSecret: argv.jwt_secret || argv.jwtSecret || 'asjhczxiucipoiopiqm2376',
  jwtExpire: '7d',
```

刚刚让你自己记的那串值就用上了，把`asjhczxiucipoiopiqm2376`换成自己的，保存文件即可。

然后重新进行构建

```bash
pnpm build
```

使用PM2托管

```bash
	yarn prod:pm2
或   pm2 start ecosystem.config.js
```

观察后端是否正常拉起

```bash
pm2 logs
```

如果日志正常，则继续。

### 反代后端

进入宝塔面板—网站，设置后端网站（server.test.cn)

点击`反向代理`—`添加反向代理`

代理名称随便填，目标URL`http://127.0.0.1:2333`，发送域名`$host`其他的不用填，提交保存即可。

然后我们点击左侧的`配置文件`（网站设置）

在`access_log`字段上面，添加如下配置

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

可以通过 curl 测试一下接口访问

```bash
 curl https://server.test.cn/api/v2 -H "user-agent: any"
```

输出如下示例内容

```json
{"name":"server-next","author":"Innei <https://innei.ren>","version":"3.10.0","homepage":"https://github.com/mx-space/server-next#readme","issues":"https://github.com/mx-space/server-next/issues","hash":""}
```

可以认为正常。

接下来，我们可以去后台看看。

打开浏览器输入https://server.test.cn/qaqdmin 第一次使用会进行注册，注册完成后，重新打开后台，登录即可。

详情请参阅[设置](/guide/setting)

**还有，添加一篇测试博文、日记，友联，方便后期排错。**
## 部署前端

进入mx-space—kami文件夹

新建一个`.env`文件 或者 `cp .env.example .env`

添加/编辑，如下内容（没有就加上去)

```text
NEXT_PUBLIC_APIURL=https://server.test.cn/api/v2     //server端的API地址
NEXT_PUBLIC_GATEWAY_URL=https://server.test.cn     //server端地址
NEXT_PUBLIC_TRACKING_ID=G-*******          //改为自己的Google分析ID
NEXT_PUBLIC_ALWAYS_HTTPS=1
NETEASE_PHONE=159*******4               //网易云手机号
NETEASE_PASSWORD=bcc*******          //网易云密码
```

//为注释，不用加上去。。

### 开始构建
在`kami`目录下
```bash
pnpm i

pnpm build
```

构建完成，尝试拉起kami(前端)

```bash
	yarn prod:pm2
或   pm2 start ecosystem.config.js
```

没有报错的情况下，设置前端反代。

### 反代前端

点击网站—网站，设置前端网站（kami.test.cn）

点击`反向代理`—`添加反向代理`

代理名称随便填，目标URL`http://127.0.0.1:2323`，发送域名`$host`其他的不用填，提交保存即可。

接下来输入https://kami.test.cn 看看是否正常惹。

如果没问题，继续。
### 修改kami的部分文件

		解释一下文件的大致作用吧

- `config.ts` 顾名思义就是设置，你可以修改首页的GitHub，QQ等链接，以及备案号，照着作者的修改就行。
- `manifest.json` 主要是标题问题。
-  `_document.tsx` 主要是移动端问题。


在kami目录下找到`configs.ts`文件，大约在105行左右的位置，把下面的内容根据作者的示例，换成自己的。（主要替换url） 有备案号的换成自己的，替换完成，保存。

如果没有疑问，我们继续。

进入kami中`public`文件夹

编辑`manifest.json`，把内容换成自己的，保存即可。

进入kami中`pages`文件夹

找到`_document.tsx`这个文件，大约在48行左右的位置，看见`“静かな森” `没？ 想必聪明的你知道该干什么了吧？把作者的换成自己的，保存即可。

然后重新构建

```bash
pnpm build

yarn prod:pm2 
```

pm2那个命令也可以用，效果一样，就不赘述了。

## admin端

后端已经集成，地址为https://server.test.cn/qaqdmin ，且除非特殊情况，则没必要单独部署后台。

如果你需要单独部署后台（admin）

请参考[mx-space(旧版)部署教程](https://www.timochan.cn/posts/jc/mx-space_install)

## 部署完成后一些操作

### server端

如果你对server端文件做了修改，请重新构建一下使其生效

```bash
pnpm build
yarn prod:pm2
```

### kami端

如果你对kami端进行修改，需要重新构建一下

```bash
pnpm build
yarn prod:pm2
```

