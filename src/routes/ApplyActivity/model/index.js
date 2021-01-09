import modelEnhance from '@/utils/modelEnhance';
import {createActivity} from '../service'
import {message} from "antd";

export default modelEnhance({
    namespace: 'applyActivity',
    state: {
        activity: null
    },
    effects: {
        // 进入页面加载
        * createActivity({payload}, {call, put, select}) {
            console.log(payload)
            const {data, status} = yield call(createActivity,payload.values);
            console.log(data)
            if(status){
                message.success('提交成功')
            }
        },
    },
});
