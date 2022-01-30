# Docker 快速部署

> 本节内容将带你快速使用 Dokcer 部署后端 （将同时部署 mangoDB + redis + server）

## 准备部署

<Alert type="info">

Linux内核版本 > 4.18，建议使用5.X版本的内核；内存 > 1GiB

</Alert>

例如 Tencent Server OS、Ubuntu20.04、Debian 最新版等等，不建议使用 Centos（终究是要停更的）。

**推荐使用更新版本的Linux内核，目前只有 Tencent Server OS 能用4.18 Linux 内核进行部署**。

**如果你使用的是轻量应用服务器，直接选择 `docker` 容器版本，系统为 `Ubuntu` 即可。 **


首先检查 Linux 内核版本

```bash
uname -a
```

返回如下信息

```shell
ubuntu@VM-16-16-ubuntu:~$ uname -a
Linux VM-16-16-ubuntu 5.4.0-77-generic #86-Ubuntu SMP Thu Jun 17 02:35:03 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
```

可以看到，该系统的 Linux 内核版本为 5.4.0 ，从测试来看，Linux 内核大于 4.18.0 即可。

## 开始部署 Docker

> 经过测试，此方案在国内受到网络环境的影响，如果你能自行解决，将极大的减少后期的维护成本。

首先我们先更新索引并安装必要的软件

```bash
sudo apt update && sudo apt install git curl vim wget -y
```

### 安装 Dokcer&docker-compose

然后我们安装 Docker

> 如果你使用的是轻量应用服务器的 docker 镜像，该步骤可以跳过。

```bash
curl -fsSL https://get.docker.com | bash -s docker
```

安装 docker-compose

在GitHub上找 [Release v2.2.3 · docker/compose (github.com)](https://github.com/docker/compose/releases/tag/v2.2.3) ，找到最新的 `tag`

然后下载 `docker-compose-linux-x86_64` ，上传到 `/usr/local/bin/` 这个目录

给予执行权限

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

设置软链接

```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

检查是否安装完成

```bash
docker-compose --version
```

正常输出版本号即可。

## 使用 Docker 部署 Server

为了方便管理建议将 `docker-compose.yml` 放到 `mx-space/server` 下

```bash
mkdir -p mx-space/server

cd mx-space/server

wget https://cdn.jsdelivr.net/gh/mx-space/server-next@master/docker-compose.yml

wget https://cdn.jsdelivr.net/gh/mx-space/server-next@master/.env.example -O .env
```

并修改.env文件，将自己的域名添加至ALLOWED_ORIGINS中,之后使用`docker-compose up -d`安装

安装完成后运行`docker ps`若显示以下内容则成功

```shell
CONTAINER ID   IMAGE                    COMMAND                  CREATED          STATUS          PORTS                     NAMES
4e427bce837a   innei/mx-server:latest   "docker-entrypoint.s…"   9 minutes ago    Up 9 minutes    0.0.0.0:2333->2333/tcp    mx-server
2e10603fb71d   mongo                    "docker-entrypoint.s…"   9 minutes ago    Up 9 minutes    0.0.0.0:3344->27017/tcp   mongo
1c5ab4af887b   redis                    "docker-entrypoint.s…"   9 minutes ago    Up 9 minutes    0.0.0.0:3333->6379/tcp    redis
```

### 其他

若第一次使用 docker 的话建议阅读

服务器重启后 `docker ps` 无容器运行，可以使用 `docker ps -a`查看所有容器 再使用 `docker restart` 恢复运行

```bash
docker restart <CONTAINER ID>
```

修改`.env`文件后，可使用`docker-compose up -d`更新容器

## 完成

后端部署大功告成。
