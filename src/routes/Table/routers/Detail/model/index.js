import modelEnhance from '@/utils/modelEnhance';
import {getQRcode, getActivity_info, updatePerson} from "@/routes/Table/routers/Detail/service";

let LOADED = false;
export default modelEnhance({
  namespace: 'crudDetail',
  state: {
    data: "",
    activity_info: null,
    id: null,
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
            type: 'initQRcode',
            payload: {
              id
            }
          });
          dispatch({
            type: 'initInfo',
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
    * initQRcode({payload}, {call, put, select}) {
      let {data} = yield call(getQRcode,payload)

      yield put({
        type: 'getInitSuccess',
        payload: {
          data : data,
          id : payload,
          type : 0
        }
      });
    },
    * initInfo({payload}, {call, put, select}) {
      let {data} = yield call(getActivity_info,payload)

      yield put({
        type: 'getInitSuccess',
        payload: {
          data: data,
          id : payload,
          type : 1
        }
      });
    },
    * update_person({payload}, {call, put, select}){
      const { id } = yield select(state => state.crudDetail);
      const data = {
        id: id.id,
        limit: payload
      }
      yield call(updatePerson,data)
      return true
    }
  },
  reducers: {
    getInitSuccess(state, { payload }) {
      if (payload.type === 0) {
        return {
          ...state,
          data: payload.data,
          id : payload.id
        };
      }else {
        return {
          ...state,
          activity_info: payload.data,
          id : payload.id
        };
      }
    },
  }
});
