import { createRoutes } from '@/utils/core';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';

import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import Page403 from './Pages/403';
import NotFound from './Pages/404';
import Page500 from './Pages/500';
import Blank from './Blank';
import Table from './Table'
import TableFailed from './TableFailed'
import ActivityDetail from './Table/routers/Detail';
import heatmap from './heatmap'
import chart from './chart/EC'
import ApplyActivity from './ApplyActivity'
import ActivityParticipation from './ActivityParticipation'
import ActivityUser from './ActivityUser'
/**
 * 主路由配置
 *
 * path 路由地址
 * component 组件
 * indexRoute 默认显示路由
 * childRoutes 所有子路由
 * NotFound 路由要放到最下面，当所有路由当没匹配到时会进入这个页面
 */
const routesConfig = app => [
  {
    path: '/sign',
    title: '登录',
    indexRoute: '/sign/login',
    component: UserLayout,
    childRoutes: [
      Login(app),
      Register(app),
      NotFound()
    ]
  },
  {
    path: '/',
    title: '系统中心',
    component: BasicLayout,
    indexRoute: '/home',
    childRoutes: [
      Dashboard(app),
      Blank(app),
      heatmap(app),
      chart(app),
      Table(app),
      TableFailed(app),
      ActivityDetail(app),
      ApplyActivity(app),
      ActivityParticipation(app),
      ActivityUser(app),
      Page403(),
      Page500(),
      NotFound(),

    ]
  }
];

export default app => createRoutes(app, routesConfig);
