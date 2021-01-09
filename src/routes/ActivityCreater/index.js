import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
    path: '/ActivityCreater',
    title: '已创建的活动',
    component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
