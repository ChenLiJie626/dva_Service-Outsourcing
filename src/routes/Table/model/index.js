import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import {listAll, save, remove_activity, insert_activity} from "../service";
/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
  namespace: 'crud',

  state: {
    pageData: PageHelper.create(),
    employees: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/table' && !LOADED) {
          LOADED = true;
          dispatch({
            type: 'init'
          });
        }
      });
    }
  },

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      const { pageData } = yield select(state => state.crud);
      yield put({
        type: 'getPageInfo',
        payload: {
          pageData: pageData.startPage(1, 10)
        }
      });
      yield put({
        type: 'getEmployees'
      });
    },
    // 获取分页数据
    *getPageInfo({ payload }, { call, put }) {
      const { pageData } = payload;
      if(pageData.pageNum == null){
        pageData.pageNum = 1
      }
      let {status, data} = yield call(listAll, pageData.pageNum);
      data = PageHelper.exited(data)
      yield put({
        type: 'listSuccess',
        payload: {
          data
        }
      });

    },
    // 保存 之后查询分页
    *save({ payload }, { call, put, select, take }) {
      const { values, success } = payload;
      const { pageData } = yield select(state => state.crud);
      // put是非阻塞的 put.resolve是阻塞型的

      values.startTime = new Date(values.startTime).getTime();
      values.endTime = new Date(values.endTime).getTime();
      console.log(values,456)
      if(values.id != null) {
        yield call(save, values)
      }else {
        yield call(insert_activity,values)
      }


      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    // 修改
    *update({ payload }, { call, put }) {},
    // 删除 之后查询分页
    *remove({ payload }, { call, put, select }) {
      const { records, success } = payload;
      const { pageData } = yield select(state => state.crud);
      console.log(records,456)
      for(var i = 0; i <records.length; i++){
        console.log(records[i])
        yield call(remove_activity,records[i])
      }

      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    // 获取员工列表
    *getEmployees({ payload }, { call, put }) {
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'employees',
          url: '/crud/getWorkEmployee'
        }
      });
    }
  },

  reducers: {
    listSuccess(state, { payload }) {
      return {
        ...state,
        pageData: payload.data,
      };
    },
  }
});
