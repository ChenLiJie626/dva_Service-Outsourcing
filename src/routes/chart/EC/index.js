import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/echarts',
  title: 'ECharts',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
