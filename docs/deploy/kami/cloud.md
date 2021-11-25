# 前端云构建

> 本节将带你进行前端云构建

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

