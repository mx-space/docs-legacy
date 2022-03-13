# 云函数使用方法

> 在 kami 3.5.0 版本及以上，该节内容是必须的。

## 前言

Mix-space 的云函数实现依赖于动态的路由处理模块，通过云函数可以编写一些简单的API。

<Alert type="info">

❗注意：但是注意的是三方库的使用是有限制的；第一你需要先安装了这个库；第二是只有受信任的三方库和某些系统模块可以使用

</Alert>

具体信息可以参阅 [Severless.Readme。](https://github.com/mx-space/mx-server/blob/master/src/modules/serverless/serverless.readme.md)

## 安装库

进入后台，移动到 `其他 · 终端`

如果没有开启，请自行到 设定—系统—终端设定 里面开启终端；出于安全考虑，请使用完关闭终端功能开关。
![](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/admin-webshell.png)
进入终端，执行命令

```bash
npm install -g @mx-space/extra
# 如果缺失npm 请先使用容器内已存在的管理器安装npm（应该会有yarn）
yarn global add npm
npm i -g @mx-space/extra
```

退出后台的终端（webshell），并关闭该功能开关（建议）。

进入服务器，打开终端，执行如下命令，获取 Mx-server 的 容器ID

```bash
sudo docker ps
```

![](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/docker-Mx-server-ID.png)

可以看到示例的 容器ID 为 `27bd13ff10a0 `

我们需要重启这个容器

```bash
# 该命令中的 容器ID 为示例值，需要修改为自己
sudo docker restart 27bd13ff10a0 
```

稍等片刻，容器重启完成。

## 功能

### 歌单（网易云）

进入后台，移动到 `其他 · 配置与云函数` 

新建一个项

- 名字：`netease`
- 引用：`kami`
- 元类型：`kami`
- 数据类型：`Function`
- 公开： `是`

内容示例如下，请参照自己的情况进行修改

```typescript
async function handler(ctx, require) {
  const extra = await require('@mx-space/extra')
  const { NeteaseMusic } = extra

  const client = new NeteaseMusic(phone, password)
  await client.Login()

  const weekdata = await client.getWeekData()
  const alldata = await client.getAllData()
  const playlist = await client.getFavorite()

  const responsePayload = {
    playlist,
    weekdata,
    alldata,
  }

  return responsePayload
}

const phone = '155555*****'
const password = '66666****'
```

注意：示例中的 `phone` 和 `password` 需要替换成自己的，其他的复制过去就行。

### 追番

新建一个项

- 名字：`bangumi`
- 引用：`kami`
- 元类型：`kami`
- 数据类型：`Function`
- 公开： `是`

示例如下：

```typescript
async function handler() {
  const extra = await require('@mx-space/extra')
  const { BiliClient } = extra
  const bl = await context.getMaster().then((user) => user.socialIds.bilibili)
  const client = new BiliClient(parseInt(bl || uid))
  const bangumi = await client.getFavoriteBangumi(parseInt(len))
  return bangumi
}

const uid = 121212
const len = 10
```

注意：`uid` 是自己的 哔哩哔哩ID，`len` 是允许获取自己看过的番的最大个数，实际展示个数受限于实际的追番数。

### 背景音乐

新建一个项

- 名字：`song`

- 引用：`kami`

- 元类型：`kami`

- 数据类型：`Function`

- 公开： `是`

示例如下：

  ```typescript
  async function handler(ctx, require) {
    const { NeteaseCloudMusicApi } = await require('@mx-space/extra')
    const { song_url } = NeteaseCloudMusicApi
    const id = ctx.req.query.id
    if (!id) {
      return { message: 'id must be not empty stringnumber' }
    }
    const data = await song_url({
      id: +id,
    })
  
    return data.body.data
  }
  ```

 注意：背景音乐的歌单依赖于 kami v3 那节中设置的网易云歌曲ID；若没有设置，则使用默认的。

到这里，Kami 默认功能需要的云函数已经配置完毕。

## 测试

以 `server.test.cn` 为例

### netease 函数

打开浏览器，访问 https://server.test.cn/api/v2/serverless/kami/netease

状态码 返回 200 ，且有正常数据出现。

示例如下：

![](https://cdn.jsdelivr.net/gh/mx-space/docs-images@latest/images/api-return.png)

### song 函数

访问 https://server.test.cn/api/v2/serverless/kami/song?id=95438221

状态码 返回 200 ，且返回该歌曲的数据

### bangumi 函数

访问  https://server.test.cn/api/v2/serverless/bangumi/

状态码 返回 200，且返回你自己的追番数据

## 结束

如果测试都没问题，可以愉快的升级 Kami 3.5.0版本及以上了，而且据作者介绍，可以通过这个自己 DIY 一些功能，期待各位大佬的PR。
