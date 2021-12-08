## 后台单独部署

> 本节内容将带你单独部署后台

## 开始

新建一个站点，例如 ` admin.test.cn` ，配置好SSL证书，记录下网站目录，准备开始！

### 拉取仓库

```bash
git clone https://github.com/mx-space/admin-next.git --depth 1 admin
```

### 安装依赖

```bash
cd admin
pnpm i
```

### 修改配置文件

找到 `admin` 目录下的 `.env.production` 文件，修改其中的项目，示例如下：

```text
VITE_APP_BASE_API=https://server.test.cn/api/v2            #API地址
VITE_APP_WEB_URL=https://kami.test.cn						   #前端地址
VITE_APP_GATEWAY=https://server.test.cn					#API网关地址
VITE_APP_LOGIN_BG=https://gitee.com/xun7788/my-imagination/raw/master/images/88426823_p0.jpg #后台登陆背景图地址
# VITE_APP_PUBLIC_URL=https://cdn.jsdelivr.net/gh/mx-space/admin-next@gh-pages/
```

找到目录下的 `index.html` 修改你想修改的内容，例如 `title` 。

找到 `src` 目录中 `configs.ts` 修改后台名字。



### 构建

```bash
pnpm build
```

### 复制

`dist` 目录中存放着构建出的文件，将该目录下的所有文件复制到 `admin.test.cn` 的网站根目录下，访问 https://admin.test.cn 大功告成。

## 完成

恭喜你完成了本节内容。
