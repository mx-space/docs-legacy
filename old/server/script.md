# 部署脚本部署

> 本节内容将带你使用部署脚本快速部署

## 准备部署

<Alert type="info">

Linux内核版本 > 4.18，建议使用5.X版本的内核；内存 > 1GiB

</Alert>

例如 Tencent Server OS、Ubuntu20.04、Debian 最新版等等，不建议使用 Centos（终究是要停更的）。

**推荐使用更新版本的Linux内核，目前只有 Tencent Server OS 能用4.18 Linux 内核进行部署**

### 安装宝塔面板

安装宝塔面板，[目标地址](https://www.bt.cn/bbs/thread-19376-1-1.html)。

### 安装必备软件

进入宝塔面板—软件商店—运行环境，安装`Nginx`、`Redis`、`MongoDB`，`pm2管理器` 。

安装完成后，点击左侧终端，进入终端，切换到root账户。

创建相关文件夹

```bash
cd
mkdir -p mx
mkdir -p ~/.mx-space/log/
```

切换到目标文件夹

```bash
cd mx
```

安装相关软件

```bash
npm i -g zx pm2
npm init -y
wget -O server-deploy.js https://cdn.jsdelivr.net/gh/mx-space/mx-server@master/scripts/deploy.js
```

## 开始部署

接着上面的内容

使用如下命令

```bash
node server-deploy.js --jwtSecret=please_change_this_value --allowed_origins=your_site 
```

注意修改一下 这个 jwtSecret. 值可以随机数字字母，不要用示例值，以及修改 allowed_origins。

jwtSecret：随机值，你喜欢就行。

allowed_origins：这里填写你的前端地址。

以 innei.ren 举例

```bash
node server-deploy.js --jwtSecret=c0f1b6a831c399e2 --allowed_origins=innei.ren
```

## 后端部署完成

使用 curl 测试是否正常

```bash
curl http://localhost:2333/api/v2 -H "user-agent: any"
```

输出一下内容即为正常

```json
{"name":"server-next","author":"Innei <https://innei.ren>","version":"3.11.2","homepage":"https://github.com/mx-space/server-next#readme","issues":"https://github.com/mx-space/server-next/issues","hash":""}#
```



