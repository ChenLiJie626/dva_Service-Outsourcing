import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/blank',
  title: '活动位置展示',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
