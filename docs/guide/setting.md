---
toc: menu
order: 4
---

# 设置

这一节主要介绍一下设置部分。

打开后台管理 - 设定。

用户部分可以完善一下，这部分没啥好说的。

来到系统部分。

网站设置和 SEO 优化按自己需求改一下就好。

![imw5ro](https://raw.githubusercontent.com/mx-space/docs-images/master/images/imw5ro.png)

## 后台附加设置

- 开启后台管理反代：可以用通过 &lt;api 地址>/qaqdmin 访问到后台管理，如 <https://api.innei.dev/qaqdmin>，关闭则无法进入，但是可以单独部署一个自己的后台管理。
- 中后台标题：反代面板的标题
- 登录页面背景：反代面板的登陆页背景
- 高德查询 API Key（可选）：需要先去[高德开放平台](https://console.amap.com/dev/key/app)完成注册，然后申请一个 Key。你可以不填，如果你不需要用日记中的定位功能的话。

![G7De6D](https://raw.githubusercontent.com/mx-space/docs-images/master/images/G7De6D.png)

## 评论设置

- 反垃圾开关
- 自定义屏蔽关键词
- 自定义屏蔽 IP
- 禁止非中文评论

以上都比较好理解。字面意思

## 评论回复设置

该部分提供评论提醒和友链申请提醒功能，首先你需要有一个邮箱，最好是域名邮箱。

- 发件邮箱 host： 其实是 SMTP 地址

例如 QQ 企业邮箱的案例

![Xs8g1K](https://raw.githubusercontent.com/mx-space/docs-images/master/images/Xs8g1K.png)

## 备份

该功能提供数据库的备份，使用 mongodump 完成这个操作，请确保已安装 mongodb-tools。

同时可以填写腾讯 COS 信息，同时会把备份上传到 COS。

备份是一个 Cron 任务，将会在每天凌晨自动进行。你可以在 其他 - 任务 中看到这个任务。

![AfN20h](https://raw.githubusercontent.com/mx-space/docs-images/master/images/AfN20h.png)

## 百度推送

该功能提供自动上传站点信息到百度，众所周知百度的收录能力过于糟糕。

你需要先去[百度站长](https://ziyuan.baidu.com/linksubmit/index)完成注册，认证你的域名，然后填写 Token。

<Alert type="info">
注意⚠️：请先确保 系统 - 网站设置 - 前端地址 填写正确
</Alert>

![zEgXj5](https://raw.githubusercontent.com/mx-space/docs-images/master/images/zEgXj5.png)

该功能也是一个 Cron 任务，一次配置每天推送，无需关心。同样可以在 其他 - 任务 中看到这个任务。

## Algolia Search

Algolia Search 是一个第三方搜索服务。这个功能展示还没有在前端落地，暂不讨论。
