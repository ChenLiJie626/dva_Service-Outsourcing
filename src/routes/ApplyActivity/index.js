import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
    path: '/ActivitySign',
    title: '创建活动',
    component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
