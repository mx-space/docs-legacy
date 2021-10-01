---
toc: menu
title: 反向代理
order: 5
---

# 反向代理

接下来我们将把服务部署到公网，假设域名为 `dev.shizuri.net`.

```
dev.shizuri.net -> 主站
dev.shizuri.net/api -> API 服务
dev.shizuri.net/qaqdmin -> 管理面板
```

开始之前，确保已经启动 Server，并且端口监听在 2333，可以通过 `127.0.0.1:2333` 访问。并且域名已经解析到此服务器.

以 Caddy，Ubuntu 为例，首先安装 Caddy。参见 <https://caddyserver.com/docs/install>

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo tee /etc/apt/trusted.gpg.d/caddy-stable.asc
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy -y
```

编辑 `/etc/caddy/Caddyfile`，在尾部增加如下配置：

```conf
dev.shizuri.net {
   encode gzip
   handle /api/* {
     reverse_proxy localhost:2333
   }
   handle /qaqdmin {
     reverse_proxy localhost:2333
   }
   handle /graphql {
     reverse_proxy localhost:2333
   }
    handle /socket.io {
     reverse_proxy localhost:2333
   }
   tls tukon@gmail.com
}
```

<Alert type="info">
<p>上面 tls 后面的邮箱换成自己，Caddy 会自动签发 TLS 证书</p>
</Alert>

然后 `systemctl reload caddy`

此时访问 `dev.shizuri.net` 已经可以访问到服务.

![utgcQO](https://cdn.jsdelivr.net/gh/mx-space/docs-images@master/images/utgcQO.png)

进入 `dev.shizuri.net/qaqdmin` 完成初始化，然后填写相关用户和系统设置。可以预先发布几篇文章，或者导入 Markdown。接下来部署主站.

## 主站公网访问

接下来需要把主站部署到 `dev.shizuri.net`，以 Kami 为例。首先需要构建项目.

```bash
cd mx
git clone https://github.com/mx-space/kami.git --depth 1
cd kami
pnpm i
cp .env.example .env
```

编辑 `.env` 前边两个变量给成自己的域名，如下:

```
NEXT_PUBLIC_APIURL=https://dev.shizuri.net/api/v2
NEXT_PUBLIC_GATEWAY_URL=https://dev.shizuri.net
```

然后构建

```bash
npm run build
```

然后可以用 `npx next start -p 2323` 跑一下。没问题的话，再改一下 Caddyfile，把主站也反代一下。修改之后的配置如下。

```
dev.shizuri.net {
  encode gzip
  handle /qaqdmin {
    reverse_proxy localhost:2333
  }
  handle /api/* {
    reverse_proxy localhost:2333 {
      header_up Host {host}
      header_up X-Real-IP {remote}
    }
  }
  handle /graphql {
    reverse_proxy localhost:2333 {
      header_up Host {host}
      header_up X-Real-IP {remote}
    }
  }
  handle /socket.io/* {
    uri strip_prefix /path
    rewrite * /socket.io{path}
    reverse_proxy localhost:2333 {
      header_up Host {host}
      header_up X-Real-IP {remote}
    }
  }

  handle /* {
    reverse_proxy localhost:2323
  }
  tls tukon@gmail.com
}

```

大功告成，现在可以访问 `https://dev.shizuri.net` 了。

![XpItn2](https://cdn.jsdelivr.net/gh/mx-space/docs-images@master/images/XpItn2.png)