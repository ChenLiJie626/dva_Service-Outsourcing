import modelEnhance from '@/utils/modelEnhance';
import {getQRcode} from "@/routes/Table/routers/Detail/service";

let LOADED = false;
export default modelEnhance({
  namespace: 'crudDetail',
  state: {
    data: "",
    activity_info: null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/crud/detail' && !LOADED) {
          LOADED = true;
          let str = history.location.search;
          let n1 = str.length;//地址的总长度
          let n2 = str.indexOf("=");//取得=号的位置
          let id = str.substr(n2 + 1, n1 - n2);//从=号后面的内容
          dispatch({
            type: 'init',
            payload: {
              id
            }
          });
        }
      });
    }
  },
  effects: {
    // 进入页面加载
    * init({payload}, {call, put, select}) {
      console.log(payload)
      let {data} = yield call(getQRcode,payload)
      yield put({
        type: 'getSuccess',
        payload: {
          data
        }
      });
    },
  },
  reducers: {
    getSuccess(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
  }
});
