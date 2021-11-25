# 部署脚本部署

> 本节内容将带你使用部署脚本快速部署

## 准备部署

系统准备：Linux内核版本大于4.18，内存大于1G，且宝塔支持的比较好的Linux发行版本。推荐安装Tencent  server OS 3.1，Ubuntu20.04，以及Debian等Linux发行版的最新版本。 

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
wget -O server-deploy.js https://cdn.jsdelivr.net/gh/mx-space/server-next@master/scripts/deploy.js
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

以innei.ren举例

```bash
node server-deploy.js --jwtSecret=c0f1b6a831c399e2 --allowed_origins=innei.ren
```

## 后端部署完成

使用curl测试是否正常

```bash
curl http://localhost:2333/api/v2 -H "user-agent: any"
```

输出一下内容即为正常

```json
{"name":"server-next","author":"Innei <https://innei.ren>","version":"3.11.2","homepage":"https://github.com/mx-space/server-next#readme","issues":"https://github.com/mx-space/server-next/issues","hash":""}#
```



