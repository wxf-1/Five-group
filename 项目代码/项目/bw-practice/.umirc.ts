import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  antd: {
    compact: true,
  },
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  // // 启用hash,或者内容摘要命名
  hash: true,
  // // 修改路由类型
  history: { type: 'hash' },
  // 配置路由按需加载
  dynamicImport: {
    loading: '@/Loading',
  },
  // 路由前缀
  base: '/1809A/wuxinfei/project/',
  // // 资源输出路径
  publicPath: process.env.NODE_ENV === 'production' ? '/1809A/wuxinfei/project/' : '/',
});
