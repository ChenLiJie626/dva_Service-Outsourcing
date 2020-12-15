/**
 * 模拟CRUD数据
 */
export default ({fetchMock, delay, mock, toSuccess, toError}) => {
  return {
    // 表格带分页
    '/api/crud/getList': (options) => {
      const body = JSON.parse(options.body);
      const currentPage = body.currentPage;
      const idbase = (currentPage - 1) * 10 + 1;
      const paramMap = body.paramMap;
      const deptName = paramMap.deptName;

      if (deptName == 'abcd') {
        return toSuccess(mock({
          'currentPage': currentPage,
          'showCount': body.showCount,
          'totalResult': 0,
          'totalPage': 0,
          dataList: [],
        }), 400)
      }

      return toSuccess(mock({
        'currentPage': currentPage,
        'showCount': body.showCount,
        'totalResult': 100,
        'totalPage': 10,
        [`dataList|${body.showCount}`]: [{
          'id|+1': idbase,
          'name' : '@cword(3, 5)',
          'startTime': ['0', '1'],
          'endTime': '@county()',
        }],
      }), 400)
    },
    '/api/crud/bathDelete': (options) => toSuccess({options}, 400),
    '/api/crud/getWorkEmployee': (options) => mock({
      'status': true,
      'data|10': [{
        'key|+1': 1,
        'title': '@cname',
      }]
    }),
    '/api/crud/save': (options) => toSuccess({options}, 800),
  }
}
