# 常见问题

## 前言

我会把经常出现的问题整理到这里，方便查阅，笔者水平有限，欢迎各位大佬投稿。

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

A：请在`kami`文件夹里找到`config.ts` ，里面有你想要的答案。



Q：GitHub链接，QQ链接等如何修改？

A：此答案同上。



## 构建类

Q：安装依赖的时候，返回404错误，怎么办？

A：请使用nrm换一个镜像源。



Q：server（后端）`pnpm i` 报错怎么办？

A：可以多尝试几次，若无效，请带着截图提问。



## 设置类

Q：网站名字老是在变化，怎么办？

A：可以尝试仪表盘的清空缓存。



