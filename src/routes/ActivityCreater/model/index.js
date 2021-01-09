import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import $$ from 'cmn-utils';
import {getUserActivity} from '../service'
let LOADED = false;
export default modelEnhance({
    namespace: 'ActivityCreater',

    state: {
        pageData: PageHelper.create(),
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/ActivityCreater' && !LOADED) {
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
            const { pageData } = yield select(state => state.ActivityCreater);
            yield put({
                type: 'getPageInfo',
                payload: {
                    pageData: pageData.startPage(1, 10)
                }
            });
        },
        *getPageInfo({ payload }, { call, put }) {
            const { pageData} = payload;
            if(pageData.pageNum == null){
                pageData.pageNum = 1
            }
            console.log(pageData)
            let {status, data} = yield call(getUserActivity, pageData.pageNum)
            data = PageHelper.exited(data)
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
                pageData: payload.data,
            };
        },
    }
});
