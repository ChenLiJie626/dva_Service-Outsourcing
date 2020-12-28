import modelEnhance from '@/utils/modelEnhance';
import PageHelper from "@/utils/pageHelper";
import {listAll, listSearchAll} from "@/routes/Table/service";

let LOADED = false;
export default modelEnhance({
    namespace: 'ActivityParticipation',
    state: {
        pageData: PageHelper.create(),
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/applyActivity' && !LOADED) {
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
            const { pageData } = yield select(state => state.ActivityParticipation);
            console.log(pageData)
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
            const { pageData ,type} = payload;
            if(pageData.pageNum == null){
                pageData.pageNum = 1
            }
            console.log(pageData)
            let {status, data} = type !== 'search' ? yield call(listAll, pageData.pageNum) : yield call(listSearchAll, pageData.filters);

            data = PageHelper.exited(data)
            yield put({
                type: 'listSuccess',
                payload: {
                    data
                }
            });

        },
        // 修改
        *update({ payload }, { call, put, select }) {
            const { records, success, status } = payload;

            console.log(records)
            success();
        },
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
