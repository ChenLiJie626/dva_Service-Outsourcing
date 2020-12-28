import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
    path: '/applyActivity',
    title: '报名活动',
    component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
