# Docker快速部署

> 本节内容将带你快速使用Dokcer部署后端

## 准备工作

本节内容以Ubuntu20.04为例子，（为什么不用Centos？因为快要停更了）

首先检查Linux内核版本

```bash
unmae -a
```

返回如下信息

```bash
ubuntu@VM-16-16-ubuntu:~$ uname -a
Linux VM-16-16-ubuntu 5.4.0-77-generic #86-Ubuntu SMP Thu Jun 17 02:35:03 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
```

可以看到，该系统的Linux内核版本为5.4.0 ，从测试来看，Linux内核大于4.18.0即可。

## 开始部署

> 经过测试，此方案在国内受到网络环境的影响，如果你能自行解决，将极大的减少后期的维护成本。

首先我们先更新索引并安装必要的软件

```bash
sudo apt update && sudo apt install git curl vim wget -y
```

### 安装Dokcer&docker-compose

然后我们安装Docker

```bash
curl -fsSL https://get.docker.com | bash -s docker
```

安装docker-compose

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

### 安装node

安装nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

配置变量环境

```bash
source ~/.bashrc
```

安装node16

```bash
nvm install v16.13.0
```

安装必备软件包

```bash
npm i -g yarn zx pnpm
```

### 部署后端

新建文件夹

```bash
mkdir -p mx && cd mx
```

克隆仓库

```bash
git clone https://github.com/mx-space/docker 
```

进入目录

```bash
cd docker
```

构建

```bash
zx ./build.js
```

## 完成

后端部署大功告成。
