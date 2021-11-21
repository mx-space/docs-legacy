# 常见问题

## 前言

我会把经常出现的问题整理到这里，方便查阅，笔者水平有限，欢迎各位大佬投稿。
## 域名解析问题
Q：我输入文档中示例的域名为啥不能用？

A：文档中示例域名为`sever.test.cn`，`kami.test.cn`，请换成你自己的域名，如果不知道怎么设置三级域名，请问百度。

## 重启类

Q：我的服务器重启后，网站进去不了？怎么办？

A：请到sever/kami的文件夹重新拉起后端/前端（常规部署），以下两个命令任选其一。

```bash
yarn prod:pm2  
pm2 start ecosystem.config.js
```

如果是Docker部署的，走一遍

```bash
docker-compose pull && docker-compose up -d 
```



## 信息类

Q：我的备案信息怎么修改？

A：请在`kami`文件夹里找到`configs.ts` ，里面有你想要的答案。



Q：GitHub链接，QQ链接等如何修改？

A：此答案同上。


Q：后台地址是什么？

A：[server.test.cn/qaqdmin](https://server.test.cn/qaqdmin)  //仍为文档中的示例域名

## 构建类

Q：安装依赖的时候，返回404错误，怎么办？

A：请使用nrm换一个镜像源。



Q：server（后端）`pnpm i` 报错怎么办？

A：可以多尝试几次，若无效，请带着截图提问。



## 设置类

Q：网站名字老是在变化，怎么办？

A：可以尝试点击仪表盘的清空缓存按钮。

## 升级类

Q：如何升级server(后端)/kami(前端)？

A：讲原有的文件夹备份一下，例如server重命名为server.d。然后，重新拉取仓库，然后进行pnpm i/pnpm build，具体可以参考[新手从零部署](/guide/0_to_install_mx-space)
