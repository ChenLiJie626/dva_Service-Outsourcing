import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = (app) => ({
    path: '/table_failed',
    title: '待审批的活动',
    component: dynamicWrapper(app, [import('./model')], () => import('./components')),
});

export default (app) => createRoute(app, routesConfig);
