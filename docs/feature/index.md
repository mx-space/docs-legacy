# 项目介绍

> 本篇内容将会为您介绍Mix-space的基础功能展示和开源社区的贡献者，希望你能看完。 :)


## Hello Mix Space!

## 序

嘿，欢迎来到这里，这是一个我自用的个人空间项目，整个系统从始至终都是开源，你甚至可以在 GitHub 上看到这个项目的所有黑历史，和各种屎山代码。

此项目从去年 3 月开始立项开发以来，已经经过了无数次的迭代。后端完成重构一次，中后台管理面板重写一次。整体项目趋于稳定，代码逐渐健壮起来，大概是时候写个完整的文档了。

在此之前，感谢社区贡献的文档。

路还有很长，想法还有很多，逐步实现。梦想永不止步。

<p style="text-align: right">Innei <br/>2021 年 09 月 19 日 19:08</p>

## 关于文档

没错，这就是新版的文档，还是这么简洁。本版文档由[提莫酱](https://www.timochan.cn)主写，[喵二](https://www.miaoer.xyz)补充。当然，整个项目的开发者是 [innei](https://innei.ren) 。感谢社区提出的问题及解决方案、简化许多步骤，也欢迎更多人能够参与到我们的开源社区中帮助我们优化项目。

## 前后端分离

没错， Mix-space采用的是前后端分离的形式，那什么是前后端分离呢？

前后端分离，顾名思义，前后端将会遵循某种规范，后端的接口不变，请求方式不变，即前后端数据交换遵循的某种规范。

这对前端开发将会带来极大的方便，不需要与后端在接口问题上扯皮，同时也方便了为Mix-space开发前端的人，这点我稍后再讲。

## 现有功能

- 仪表盘

  可以总览各类数据。一言和今日诗句来自第三方服务。![仪表盘](https://raw.githubusercontent.com/mx-space/docs-images/master/images/V0BRMI.png)

- 文章

  可以发布，修改，删除，标记文章。![文章](https://raw.githubusercontent.com/mx-space/docs-images/master/images/Vd1kAW.png)

- 日记

  可以发布，修改，删除，标记日记，同时为了方便回忆，兼备定位功能（需要配合高德地图API）。![日记](https://raw.githubusercontent.com/mx-space/docs-images/master/images/mAwG4T.png)

- 编辑器

  现支持`manco` ， `codemirror` ，`vditor` ， `plain` 这四种编辑器，其中 `vditor` 这个编辑器获得的体验不亚于 `Typora` 。![编辑页](https://raw.githubusercontent.com/mx-space/docs-images/master/images/ROaydk.png)![编辑器](https://cdn.jsdelivr.net/gh/mx-space/manco.png)

- 评论

  评论有三种类型，没读过的、读过的、被判断为垃圾评论被过滤的。![评论管理](https://raw.githubusercontent.com/mx-space/docs-images/master/images/oNhuO0.png)

- 说说

  说说可以用来记录一句话，或者直接保存发布一条[一言](https://hitokoto.cn/)![说说编辑](https://raw.githubusercontent.com/mx-space/docs-images/master/images/gMs43j.png)

- 友链

  在这里可以管理友链，新增的未审核的友链会通知到主人，主人通过之后也会邮件通知到对方。![友情链接](https://raw.githubusercontent.com/mx-space/docs-images/master/images/2rNFVS.png)

- 数据大盘

  您可以看到今日访问的`PV` 、`UA` ，及近期访问相对频繁的`URL` 。![数据大盘](https://raw.githubusercontent.com/mx-space/docs-images/master/images/2ke5KU.png)

- 备份

  在这里可以管理备份，包括下载和直接回滚，或者上传数据文件进行恢复。（需要mongodb-tools）![备份](https://raw.githubusercontent.com/mx-space/docs-images/master/images/0cTOSl.png)

- Markdown 导入导出

  该功能提供将所有文章导出为 Markdown YAML 兼容的格式，或者导入 Markdown YAML 兼容的文件。（Hexo 兼容的 Markdown）![导出页](https://raw.githubusercontent.com/mx-space/docs-images/master/images/unEHOF.png)

![](https://raw.githubusercontent.com/mx-space/docs-images/master/images/AWpLgf.png)
