import modelEnhance from '@/utils/modelEnhance';
import { register, getAuthCode, verifyAuthCode } from '../service';

export default modelEnhance({
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      try {
        const verify = {
          telephone: payload.phone,
          authCode: payload.captcha
        }
        const {code} = yield call(verifyAuthCode, verify)
        if(code !== 200){
          return false;
        }
        const response = yield call(register, payload);
        console.log(response)
        yield put({
          type: 'registerHandle',
          payload: response,
        });
      }catch (e){

      }


    },
    *getAuthCode({ payload }, { call, put }){
      const {message, status, code} = yield call(getAuthCode, payload);
      console.log(message,status)
      if (code === 200){
        return true
      }
    }
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
});
