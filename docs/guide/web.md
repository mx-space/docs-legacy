---
toc: menu
order: 6
---

# 搭建前端

由于是前后端分离项目，前端用什么其实并不是很重要，话是这么说。但是现在也只有我自己写的一个 [Kami](https://github.com/mx-space/kami) 可以用。后续我打算写一个 SDK，然后再写几个好看点的 mx-space 前端项目。

接下来以 Kami 为例。

## 本地构建

这一节我们来部署一下 Kami。

```bash
cd
mkdir -p mx
cd mx
git clone https://github.com/mx-space/kami.git --depth 1
cd kami
git fetch --tags && git checkout $(git rev-list --tags --max-count=1) # 最后一个稳定分支
pnpm i
cp .env.example .env
echo 'NEXT_PUBLIC_APIURL=http://127.0.0.1:2333/api/v2' >> .env
pnpm run build
yarn run next start -p 2323
```

然后在本地机上转发端口到本地

```bash
ssh -f -N -L 2323:localhost:2323 username@host
ssh -f -N -L 2333:localhost:2333 username@host
```

浏览器访问 <http://127.0.0.1:2323/> 你可以看到主页了

![Xnip2021-09-21_10-32-10](https://raw.githubusercontent.com/mx-space/docs-images/master/images/Xnip2021-09-21_10-32-10.png)

<Alert type="info">
  本地构建要求你的服务器配置至少 2G 内存，2 vCPU，如果你的服务器没有这个配置请看下节，云构建
</Alert>

注：有的小伙伴发现歌单报错。

请在.env文件中添加以下内容
```text
NETEASE_PHONE=手机号
NETEASE_PASSWORD=密码
```
编辑后保存，然后重新构建一下

如果要修改备案号什么的，请修改kami目录下`config.ts`这个文件，然后重新构建一下即可。


## 云构建

云构建采用 GitHub Workflows 完成，具体流程可以参考 <https://innei.ren/posts/technology/github-ci-cd>，形式上大同小异，这里做一个简易操作。

Fork 这个项目 <https://github.com/Innei/mx-actions>, 然后在 Setting - Secret 中填入这些字段

![XlIdQi](https://raw.githubusercontent.com/mx-space/docs-images/master/images/XlIdQi.png)

![Jag8jc](https://raw.githubusercontent.com/mx-space/docs-images/master/images/Jag8jc.png)

首先 SSH 到远程服务器, 新建一个 deploy 用户, 如果你有非 root 权限的用户可以忽略此步骤, 如果你坚持想用 root 账户, 请跳过此步骤.

```bash
sudo useradd deploy
sudo passwd deploy
sudo mkdir -p /home/deploy
sudo chown -R deploy:deploy /home/deploy
```

建立用户之后, 确保该用户能通过密码连接 SSH 到服务器. 如果不可以可以参考修改 `/etc/ssh/sshd_config`

在 `sshd_config` 底下增加一条

```conf
Match User deploy
  PasswordAuthentication yes
```

随后

```
sudo systemctl restart ssh.service
```

对了, 你还需要安装 tmux 来后台执行一个任务, 因为只有 GitHub Workflows 跑完之后才能获取到当前 flow 的 artifacts

之后, 切换到 deploy 账户

```bash
su deploy
cd
mkdir mx
cd mx
git clone https://github.com/<username>/mx-actions.git --depth 1 # 替换 <username>
cd mx-actions
pnpm i
```

## 公网部署

参见 [反向代理](./reverse-proxy)
