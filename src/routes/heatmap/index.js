import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/heatmap',
  title: '热力图',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
