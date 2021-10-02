import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Mix Space',
  mode: 'site',
  // more config: https://d.umijs.org/config
  locales: [['zh-CN', '中文']],
  navs: {
    'zh-CN': [
      null,
      { title: 'GitHub', path: 'https://github.com/mx-space/docs' },
    ],
  },
  favicon:
    'https://cdn.jsdelivr.net/gh/mx-space/docs-images@master/favicon.svg',
  logo: 'https://cdn.jsdelivr.net/gh/mx-space/docs-images@master/favicon.svg',
  hash: true,
  scripts: [
    `https://www.googletagmanager.com/gtag/js?id=G-GR9HXW9G5K`,
    `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-GR9HXW9G5K');`,
  ],
});
