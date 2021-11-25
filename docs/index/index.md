---
title: 介绍
toc: menu
order: 1
nav:
  title: 介绍
  order: 1
---
# 项目介绍

> 本篇内容将会为您介绍Mix-space的基础功能展示和开源社区的贡献者，希望你能看完。 :)

## 前后端分离

没错， Mix-space采用的是前后端分离的形式，那什么是前后端分离呢？

前后端分离，顾名思义，前后端将会遵循某种规范，后端的接口不变，请求方式不变，即前后端数据交换遵循的某种规范。

这对前端开发将会带来极大的方便，不需要与后端在接口问题上扯皮，同时也方便了为Mix-space开发前端的人，这点我稍后再讲。

## 现有功能

- 仪表盘

  可以总览各类数据，一言和今日诗句来自第三方服务。![仪表盘](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/V0BRMI.png)

- 文章

  可以发布，修改，删除，标记文章。![文章](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/Vd1kAW.png)

- 日记

  可以发布，修改，删除，标记日记，同时为了方便回忆，兼备定位功能（需要配合高德地图API）。![日记](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/mAwG4T.png)

- 编辑器

  现支持`manco` ， `codemirror` ，`vditor` ， `plain` 这四种编辑器，其中 `vditor` 这个编辑器获得的体验不亚于 `Typora` 。![编辑页](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/ROaydk.png)![编辑器](https://cdn.jsdelivr.net/gh/mx-space/docs@latest/docs/images/manco.png)

- 评论

  评论有三种类型，没读过的、读过的、被判断为垃圾评论被过滤的。![评论管理](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/oNhuO0.png)

- 说说

  说说可以用来记录一句话，或者直接保存发布一条[一言](https://hitokoto.cn/)。![说说编辑](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/gMs43j.png)

- 友链

  在这里可以管理友链，新增的未审核的友链会通知到主人，主人通过之后也会邮件通知到对方。![友情链接](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/2rNFVS.png)

- 数据大盘

  您可以看到今日访问的`PV` 、`UA` ，及近期访问相对频繁的`URL` 。![数据大盘](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/2ke5KU.png)

- 备份

  在这里可以管理备份，包括下载和直接回滚，或者上传数据文件进行恢复。（需要mongodb-tools）![备份](https://raw.githubusercontent.com/mx-space/docs-images/master/images/0cTOSl.png)

- Markdown 导入导出

  该功能提供将所有文章导出为 Markdown YAML 兼容的格式，或者导入 Markdown YAML 兼容的文件。（Hexo 兼容的 Markdown）![导出页](https://cdn.jsdelivr.net/gh/mx-space/docs@latest/docs/images/server-md.png)

## 写在目录前

没错，这就是新版的文档。

本次主要改变：

- 文档整体结构调整
- 增加模块索引
- 文档逻辑优化

## 目录

> 这就是一个目录&前言

| 模块     | 描述                           | 地址                                                     |
| -------- | ------------------------------ | -------------------------------------------------------- |
| 介绍     | 对项目的介绍及功能展示         | [起飞](/feature)                                         |
| 部署     | 整个项目的部署方法             | [起飞](/deploy)                                          |
| 设置     | 项目的各种设置的介绍           | [起飞](/setting)                                         |
| 常见问题 | 部署中未提到的问题，收录于此   | [起飞](/help)                                            |
| 开发     | 介绍后端的接口，请求处理流程等 | [起飞](/dev)                                             |
| 旧版文档 | 旧的文档                       | [走你](https://github.com/mx-space/docs/tree/master/old) |


## 鸣谢
没错，这就是新版的文档，还是这么新手向。

本版文档由

- [提莫酱](https://www.timochan.cn)主写；

- [喵二](https://www.miaoer.xyz)补充；

当然，整个项目的开发者是 [innei](https://innei.ren) 。

感谢社区提出的问题及解决方案、帮助笔者简化许多步骤，也欢迎更多人能够参与到我们的开源社区中[帮助我们优化项目](https://github.com/mx-space)。
