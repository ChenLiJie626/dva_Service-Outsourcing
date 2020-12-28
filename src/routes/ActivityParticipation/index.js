import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
    path: '/applyActivity',
    title: '活动申报',
    component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
