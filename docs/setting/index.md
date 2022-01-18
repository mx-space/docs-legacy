---
title: 设置
toc: menu
order: 1
nav:
  title: 设置
  order: 3
---
# 前端后端设置

> 本节内容将带你修改前端后端的文件，修改前做好相关备份，做到心中有数！

## 文章类

### 排版

文章排版参考了 [Typora-theme-shizuku](https://github.com/rikumi/shizuku-typora-theme)，在原有基础上做了修改，感谢 Rikumi 的开源。

## 信息类 <Badge>过时的</Badge>

<Alert type="info">
<p>
⚠️ 以下设置可能在 Kami v3 被整合到别的地方了，如果你是 v3 用户请参考 https://mx-docs.shizuri.net/deploy/kami 。

以下修改不建议，因为在 v3 可以动态配置。
</p>
</Alert>

### 备案号 & 链接

备案号、QQ 跳转链接，GitHub 链接等等。

找到 `kami` 目录下的 `configs.ts`

在这个文件里，作者以自己给出了示例，照着作者的修改即可。

> 如果你想使用 QQ 跳转链接，你可能还需要到 [QQ 推广](https://shang.qq.com/)；在推广工具-个人QQ通讯组件中 2 代码里复制 如“<http://wpa.qq.com/msgrd?v=3&uin=QQ号&site=qq&menu=yes>” 到 `configs.ts`

### 谷歌分析 & 网易云

API 地址、Gateway 地址、Google分析ID、网易云手机号号、网易云密码。

找到 `kami` 目录下的 `.env`

```text
NEXT_PUBLIC_APIURL=https://server.test.cn/api/v2     # server端的API地址
NEXT_PUBLIC_GATEWAY_URL=https://server.test.cn     # server端地址
NEXT_PUBLIC_TRACKING_ID=G-*******          # 改为自己的Google分析ID
NEXT_PUBLIC_ALWAYS_HTTPS=1
NETEASE_PHONE=159*******4               # 网易云手机号
NETEASE_PASSWORD=bcc*******          # 网易云密码
```
### 标题类

进入`kami` 的 `public` 文件夹，找到 `manifest.json` 照着作者的示例，修改保存即可。

进入`kami` 的 `pages` 文件夹，找到 `_document.tsx` ，大约在48行左右的位置，看见 `“静かな森” ` 没？ 想必聪明的你知道该干什么了吧？把作者的换成自己的，保存即可。

### 修改背景图

在 `kami` 下依次找到 `assets` 文件夹，在这里面找到 `styles` 文件夹，编辑 `theme.scss` 文件，里面有你想要的答案。

### 修改社交链接

在 `kami` 文件夹，找到 `configs.ts` 中找到 `const social: SocialLinkModel[] = [` 这一行进行修改

`FontAwesome` 图标可在 https://fontawesome.com/v5.15/icons 或者 https://fa5.dashgame.com/#/图标 中获取并且复制仅限free版本。

网站默认复制内容为 `far fa-paper-plane`，如果加入Telegram 社交图标链接则使用 `fa-paper-plane` 以此类推。

![](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/telegram-icon-fapaperplane.png)

> 如RSS订阅:
> ```typescript
> {
>    url: 'https://innei.ren/atom.xml',
>    title: 'RSS订阅',
>    icon: 'fa-rss',
>    color: '#FFA500',
> },
> ```

## 升级

给 Mix space 升级，分为给 kami 升级和给 Server 升级

在升级前先备份原来的文件

### kami

> 假如你要更新 kami ，将 `kami` 文件夹修改为 `kami.d` 或者其他名字

在 `root/mx-space` 目录下执行以下命令

```bash
git clone https://github.com/mx-space/kami.git --depth 1
cd kami && git fetch --tags && git checkout $(git rev-list --tags --max-count=1)
```

然后将以下文件进行文件替换,将刚刚备份的 `kami.d` 目录下的文件复制回去更新后的 `kami` 目录；

```
kami.d/public/manifest.json
kami.d/.env
kami.d/config.ts
kami.d/utils/images.ts
kami.d/pages/_document.tsx
```

> 假如你在 `kami.d/public` 塞了别的东西同理，可以将整个 `public` 复制到更新后的 `kami` 目录，
> 开发者并不建议在 `public` 下进行别的操作仅供参考咯。

然后执行编译命令，并且完成后开启。

```bash
pnpm i && pnpm build && pm2 start
```

### server

> 假如你要更新 server ，将 `server` 文件夹修改为 `server.d` 或者其他名字

在 `root/mx-space` 目录下执行以下命令

```bash
git clone https://github.com/mx-space/server-next.git --depth 1 server
cd server && git fetch --tags && git checkout $(git rev-list --tags --max-count=1)
```

然后将以下文件进行文件替换,将刚刚备份的 `server.d` 目录下的文件复制回去更新后的 `server` 目录；

```
server.d/src/app.config.js
server.d/ecosystem.config.js
```

然后执行编译命令，并且完成后开启。

```bash
pnpm i && pnpm build && pm2 start
```

## 域名更换 <Badge>过时的</Badge>

在遇到域名过期或者购置新域名时，需要修改前后端设置才能生效

> 建议先关闭抗cc防火墙当有一个设置没到位时前端会一直cc导致防火墙ban掉IP

在 `server` 文件夹，进入`src`目录，编辑 `app.config.js`

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

> 如域名改为: www.miaoer.xyz
> ```javascript
> exports.PORT = argv.port || process.env.PORT || 2333
> exports.API_VERSION = 2
> exports.CROSS_DOMAIN = {
>   allowedOrigins: argv.allowed_origins
>     ? argv.allowed_origins?.split?.(',') || []
>     : [
>         'www.miaoer.xyz',
>       ],
>   // allowedReferer: 'innei.ren',
> }
> ```

在 `kami` 文件夹，编辑 `config.ts`

大概在126行

```typescript
export default {
  url: 'https://innei.ren',
  alwaysHTTPS:
    process.env.NODE_ENV === 'development'
      ? false
      : process.env.NEXT_PUBLIC_ALWAYS_HTTPS &&
        parseInt(process.env.NEXT_PUBLIC_ALWAYS_HTTPS) === 1,
  social,
  biliId: 26578164,
  homePage: 'https://innei.ren', // footer link
  menu,
  icp: {
    name: '浙ICP备 20028356 号',
    url: 'http://beian.miit.gov.cn/',
  },
  travellings: true, // 开往
  donate: 'https://afdian.net/@Innei',
}
```

将 `https://innei.ren` 修改为自己新域名

> 如：
> ```typescript
> export default {
>  url: 'https://www.miaoer.xyz',
>  alwaysHTTPS:
>  ...... //此处省略
>  ```

> 如果你修改了后端地址也记得修改 `kami` 目录下的 `.env` 中的 Server & Gateway 地址

## 后续

掌握以上信息修改，更多内容请继续探索！
笔者水平有限，本节内容有待大佬补充。

