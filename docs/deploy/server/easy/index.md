# 常规部署

## 准备工作

### 系统要求

Linux内核版本：>=4.18

输入以下命令查看内核版本

```bash
unmae -a
```

### 准备环境

安装宝塔面板，安装完成后进入软件商店—运行环境中

安装`redis`、`mongoDB`、`pm2管理器` 。

## 开始部署

首先我们安装必备的软件包

安装`pnpm` , `yarn` ,`nrm `，`pm2`

```bash
npm install -g pm2 nrm pnpm yarn
```

验证安装是否完成

```bash
node -v
pm2 -v
pnpm -v
yarn -v
```

输出版本号即可。



