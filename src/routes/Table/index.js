import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = (app) => ({
    path: '/table',
    title: '表格',
    component: dynamicWrapper(app, [import('./model')], () => import('./components')),
});

export default (app) => createRoute(app, routesConfig);
