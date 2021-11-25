# Docker 快速部署

> 本节内容将带你快速使用 Dokcer 部署后端 （将同时部署 mangoDB + redis + server）

## 准备工作

本节内容以 Ubuntu20.04 为例子，（为什么不用 Centos？因为快要停更了）

首先检查 Linux 内核版本

```bash
unmae -a
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

```bash
curl -fsSL https://get.docker.com | bash -s docker
```

安装 docker-compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

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

docker-compose up -d
```

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

## 完成

后端部署大功告成。
