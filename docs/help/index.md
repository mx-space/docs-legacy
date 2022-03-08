---
title: 常见问题
toc: menu
order: 1
nav:
  title: 帮助
  order: 4
---
# 常见问题

> 我会把经常出现的问题整理到这里，方便查阅，笔者水平有限，欢迎各位大佬投稿。

## 域名解析问题

Q：我输入文档中示例的域名为啥不能用？

A：文档中示例域名为 `server.test.cn`， `kami.test.cn`，请换成你自己的域名，如果不知道怎么设置三级域名，请问百度。

## 信息类

Q：我的备案信息怎么修改？

A：请详细参阅文档，设置部分。

Q：GitHub 链接，QQ 链接等如何修改？

A：同上，同时，请善用文档的搜索功能。

Q：后台地址是什么？

A：`https://server.test.cn/qaqdmin`  //注意此处仍为文档示例

## 构建类

Q：安装依赖的时候，返回404错误，怎么办？

A：请使用nrm换一个镜像源。例如

```bash
nrm use yarn
```

Q：server（后端）`pnpm i` 报错怎么办？

A：可以多尝试几次，若无效，请带着截图提问。

## 设置类

Q：网站名字老是在变化，怎么办？

A：可以尝试点击仪表盘的清空缓存按钮。

## 重启类

Q：我的服务器重启后，网站进去不了？怎么办？

A：请到 server / kami 的文件夹重新拉起后端/前端（常规部署），以下两个命令任选其一。

```bash
yarn prod:pm2  
pm2 start
```

如果是 Docker 部署的，走一遍

```bash
docker compose pull && docker compose up -d
```


## 升级类

Q：如何升级 server(后端) / kami(前端)？

A：当然如果是传统常规部署请把 kami.d 替换文件到 kami 中，如在首次部署时修改了 ``.env`` 文件将 kami.d 拷贝至 kami 并在 kami 目录下执行 ``pnpm i && pnpm build``，具体可以参阅之前的[部署文档](/deploy#安装-kami)。

如果是 Docker 部署的，走一遍

```bash
docker compose pull && docker compose up -d
```

## 等待添加

帮助手册仍然不完善 ing.....

## 写在后面

文档可以进行举一反三，请务必仔细看完 Docs 来了解 Mix-space 的运行逻辑；笔者水平有限，欢迎各位大佬投稿。
