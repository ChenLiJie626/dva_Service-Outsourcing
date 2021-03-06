import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/home',
  title: '主页',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
