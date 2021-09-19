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
});
