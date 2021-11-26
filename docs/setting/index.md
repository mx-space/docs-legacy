---
title: 设置
toc: menu
order: 1
nav:
  title: 设置
  order: 3
---
# 前端信息内容修改

> 本节内容将带你修改前端的文件

## 信息类

### 备案号 & 链接

备案号、QQ 跳转链接，GitHub 链接等等。

找到 `kami` 目录下的 `configs.ts`

在这个文件里，作者以自己给出了示例，照着作者的修改即可。

### 标题类

进入`kami` 的 `public` 文件夹，找到 `manifest.json` 照着作者的示例，修改保存即可。

进入`kami` 的 `pages` 文件夹，找到 `_document.tsx` ，大约在48行左右的位置，看见 `“静かな森” `没？ 想必聪明的你知道该干什么了吧？把作者的换成自己的，保存即可。

### 修改背景图

在 `kami` 下依次找到 `assets` 文件夹，在这里面找到 `styles` 文件夹，编辑 `theme.scss` 文件，里面有你想要的答案。

### 修改社交链接

在 `kami` 文件夹，找到 `configs.ts` 中找到 `const social: SocialLinkModel[] = [` 这一行进行修改

`FontAwesome` 图标可在 https://fontawesome.com/v5.15/icons 或者 https://fa5.dashgame.com/#/图标 中获取并且复制仅限free版本。

如果加入Telegram社交图标链接则使用 `fa-paper-plane` 以此类推。

> 如
> ```typescript
> {
>    url: 'https://innei.ren/atom.xml',
>    title: 'RSS订阅',
>    icon: 'fa-rss',
>    color: '#FFA500',
> },
> ```

## 后续

笔者水平有限，本节内容有待大佬补充。

