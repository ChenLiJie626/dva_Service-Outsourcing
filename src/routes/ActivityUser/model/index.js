import modelEnhance from '@/utils/modelEnhance';
import $$ from 'cmn-utils';
import {getUserActivity} from '../service'
let LOADED = false;
export default modelEnhance({
    namespace: 'ActivityUser',

    state: {
        activity: null
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/ActivityUser' && !LOADED) {
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
        * init({payload}, {call, put, select}) {
            const user = $$.getStore('user')

            const {data} = yield call(getUserActivity,user.staffId);
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
                activity: payload.data,
            };
        },
    }
});
