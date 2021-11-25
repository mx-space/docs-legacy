---
title: 前端反向代理
toc: menu
order: 6
nav:
  title: 部署
  order: 3
---

# 前端反向代理

> 本节将带你进行前端反向代理，比较简单，仍以nginx作为示例，caddy稍后补充

## 准备部署

> 准备工作已经在前面的章节完成

## 开始

### 添加站点

如同前面后端反向代理一样，我们需要为前端添加一个站点，这里我们以`kami.test.cn` 作为示例域名。

### 设置SSL证书

在后端反向代理—SSL证书那部分已经阐述。

### 设置反向代理

点击`kami.test.cn` —设置—反向代理

代理名称随便填，目标URL `http://127.0.0.1:2323` ，发送域名 `$host` ，其他的不用填，提交保存即可。

示例如下

![kami-daili.png (699×519) (jsdelivr.net)](https://cdn.jsdelivr.net/gh/mx-space/docs@latest/docs/images/kami-daili.png)

## 完成

访问https://kami.test.cn 只要返回内容即可，请参照目录继续。
