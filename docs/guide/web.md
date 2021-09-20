---
toc: menu
---

# 搭建前端

由于是前后端分离项目，前端用什么其实并不是很重要，话是这么说。但是现在也只有我自己写的一个 [Kami](https://github.com/mx-space/kami) 可以用。后续我打算写一个 SDK，然后再写几个好看点的 mx-space 前端项目。

接下来以 Kami 为例。

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
pnpm run start
```

