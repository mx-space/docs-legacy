# Caddy2

## 介绍

Caddy2 自动 HTTPS 配置简单 阅读 caddy 文档请注意版本

## 下载

```bash

wget -c 'https://caddyserver.com/api/download?os=linux&arch=amd64&idempotency=68130550408543' -O caddy

chmod 777 caddy

mv caddy /usr/local/bin

```

## Caddyfile

在 `mx-space` 目录下创建 `Caddyfile` 文件

```bash
vim Caddyfile
```

写入以下内容保存并退出

```bash
# 假如端口没有改的话

# kami端
域名 {
	reverse_proxy localhost:2323
}

# server端
域名 {
	reverse_proxy localhost:2333
}


```

## 运行

```bash
caddy start
```

注：若运行失败可以使用 `netstat -tpunl` 查看 `80` 与 `443` 端口被占用导致启动失败等问题

运行后若显示以下内容则运行成功

```bash
...
...
Successfully started Caddy (pid=30607) - Caddy is running in the background
```

运行成功后就可以使用 https 访问啦
