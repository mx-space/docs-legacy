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
  exportStatic: {},
  styles: [
    `kbd {
      margin: 0 0.2em;
      padding: 0.15em 0.4em 0.1em;
      font-size: 90%;
      background: rgba(150,150,150,.06);
      border: 1px solid rgba(100,100,100,.2);
      border-bottom-width: 2px;
      border-radius: 3px;
  }`,
  ],
});
