import { routerRedux } from 'dva';
import { login,timers } from '../service';
import $$ from 'cmn-utils';

export default {
  namespace: 'login',

  state: {
    loggedIn: false,
    message: '',
    user: {}
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/sign/login') !== -1) {
          $$.removeStore('user');
        }
      });
    }
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        payload = {
          userName: Number(payload.userName),
          password: payload.password
        }
        const { status, message, data } = yield call(login, payload);
        console.log(status)
        // console.log(yield call(timers,payload));
        if (status) {
          $$.setStore('user', data);
          yield put({
            type: 'loginSuccess',
            payload: { data }
          });
          yield put(routerRedux.replace('/'));
          return true
        } else {
          yield put({
            type: 'loginError',
            payload: { message }
          });
          return false
        }
      } catch (e) {
        console.log(e)
        yield put({
          type: 'loginError',
          payload: { message: e.message }
        });
        return false
      }
    },
    *logout(_, { put }) { }
  },

  reducers: {
    loginSuccess(state, { payload }) {
      return {
        ...state,
        loggedIn: true,
        message: '登录成功',
        user: payload
      };
    },
    loginError(state, { payload }) {
      return {
        ...state,
        loggedIn: false,
        message: payload.message
      };
    }
  }
};
