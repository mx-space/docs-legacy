---
title: 反向代理
toc: menu
order: 4
nav:
  title: 部署
  order: 3
---
# 前端部署

> 本节内容将带你以常规方法部署前端



## 准备工作

> 准备工作已经在后端部署完成

## 开始部署

### 克隆仓库

进入mx-space文件夹

```bash
cd mx-space
git clone https://github.com/mx-space/kami.git --depth 1
```

如果太慢，以下是镜像仓库

```bash
cd mx-space
git clone https://github.com.cnpmjs.org/mx-space/kami.git --depth 1
```

更换分支到最后一个稳定版本

```bash
cd kami && git fetch --tags && git checkout $(git rev-list --tags --max-count=1) && cd ..
```

### 准备构建

复制示例文件，或者新建一个名为 `.env`的文本文件

```bash
cp .env.example .env
```

编辑该文件，这是相对完整的示例，请按需修改为自己的

```text
NEXT_PUBLIC_APIURL=https://server.test.cn/api/v2     //后端的API地址，可以为IP（调试），域名（正式使用）
NEXT_PUBLIC_GATEWAY_URL=https://server.test.cn     //后端地址，可以为IP（调试），域名（正式使用）
NEXT_PUBLIC_TRACKING_ID=G-*******          //改为自己的Google分析ID
NEXT_PUBLIC_ALWAYS_HTTPS=1
NETEASE_PHONE=159*******4               //网易云手机号
NETEASE_PASSWORD=bcc*******          //网易云密码
```

> //后面的是注释，请不要抄上去

### 开始构建

安装依赖

```bash
pnpm i
```

构建

```bash
pnpm build
```

pm2托管，以下命令二选其一

```bash
yarn prod:pm2
```

结合后端部署，查看部署情况

```bash
pm2 ps
```

返回如下信息，就成功了。

```shell
┌─────┬──────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬
│ id  │ name         │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │
├─────┼──────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼
│ 2   │ mx-kami      │ default     │ N/A     │ fork    │ 3711     │ 3D     │ 0    │ online    │
│ 0   │ mx-server    │ default     │ 3.11.2  │ cluster │ 53891    │ 3D     │ 1    │ online    │
│ 1   │ mx-server    │ default     │ 3.11.2  │ cluster │ 53903    │ 3D     │ 1    │ online    │
└─────┴──────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴
```

## 前端部署完成

如果这一步你走完了，请参照目录继续。
