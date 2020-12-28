import modelEnhance from '@/utils/modelEnhance';
// import {listAll} from '../service'
let LOADED = false;
export default modelEnhance({
    namespace: 'chart',

    state: {
      college: []
    },

    subscriptions: {
      setup({ dispatch, history }) {
        history.listen(({ pathname }) => {
          if (pathname === '/echarts' && !LOADED) {
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
        yield put({
          type: 'getCollegeInfo',
        });
      },
      *getCollegeInfo({ payload }, { call, put }) {
        // let {data} = yield call(listAll)
        // yield put({
        //   type: 'listSuccess',
        //   payload: {
        //     data
        //   }
        // });
      }
    },
    reducers: {
      listSuccess(state, { payload }) {
        return {
          ...state,
          college: payload.data,
        };
      },
    }
});
