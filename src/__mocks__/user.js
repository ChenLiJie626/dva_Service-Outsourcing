/**
 * 模拟请求数据
 * @param {FetchMock} fetchMock 当现有条件不满足时，可以使用fetchMock来进行扩展
 * @param {function} delay 增加延迟时间 ms 例: delay(mockData) 或 delay(mockData, 200)
 * @param {function} mock 使用mock生成数据，例:

   mock({
     'string|1-10': '★' // 生成最少1颗，最多10颗星字符
   })

   // {'string': '★★★★★★'}

  更多用法参考 http://mockjs.com/examples.html
 */
export default ({fetchMock, delay, mock, toSuccess, toError}) => {
  // 如果现有扩展不满足需求，可以直接使用fetchMock方法
  // fetchMock.mock(/httpbin.org\/post/, {/* response */}, {/* options */});

  return {
    '/api/user/login': (options) => {
      if (options.body) {
        const user = JSON.parse(options.body);
        if (user.userName === 'admin' && user.password === 'admin') {
          return toSuccess(mock({
            'userName': 'admin',                // 用户名
            'name': '@cname',                   // 中文名称
            'age|1-100': 100,                   // 100以内随机整数
            'birthday': '@date("yyyy-MM-dd")',  // 日期
            'city': '@city(true)',              // 中国城市
            'phone': /^1[385][1-9]\d{8}/,       // 手机号
            'token': '@guid'                    // token
          }), 400);
        } else {
          return toError('用户名或密码错误 admin/admin');
        }
      } else {
        return toError('请输入用户名和密码');
      }
    },
    '/api/user/register': options => toSuccess(),
    '/api/user/menu': options => toSuccess([
      {
        name: '仪表盘',
        icon: 'DashboardOutlined',
        path: '/dashboard',
      },
      {
        name: '页面',
        icon: 'BookOutlined',
        path: '/page',
        children: [
          {
            name: '活动位置展示',
            path: '/blank',
          },
          {
            name: '热力图',
            path: '/heatmap',
          },
        ],
      },
      {
        name: '活动列表',
        icon: 'BulbOutlined',
        path: '/business',
        children: [
          {
            name: '已通过的活动',
            path: '/table/:detail?',
          },
          {
            name: '待审批的活动',
            path: '/table_failed/:detail?',
          }
        ],
      },
      {
        name: '可视化图表',
        icon: 'BookOutlined',
        path: '/chart',
        children: [
          {
            name: '图表',
            path: '/echarts',
          },
        ],
      },
      {
        name: '活动申请',
        icon: 'BookOutlined',
        path: '/apply',
        children: [
          {
            name: '创建活动',
            path: '/ActivityParticipation',
          },
        ],
      },
    ], 400)
  }
}
