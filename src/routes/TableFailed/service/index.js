import $$ from 'cmn-utils';
import {string} from "prop-types";

export async function listAll(payload){
    return $$.get('/activity/listFailed',{
        pageNum : payload,
        pageSize : 5
    });
}
export async function listSearchAll(payload){
    const data = {
        "activityName": payload.activityName,
        "collegeName" : payload.collegeName,
        "directorName": payload.directorName,
        "status" : "fail"
    }
    return $$.post('/activity/askBykeywords', data);
}
export async function save(payload){
    let url;
    url = '/activity/update/'+payload.id
    return $$.post(url, payload)
}

export async function remove_activity(payload){
    let url;
    url = '/activity/delete/'+payload.id
    return $$.get(url)
}

export async function insert_activity(payload){
    return $$.post('/activity/create/',payload)
}

export async function updatePass(payload, status){
    let url = '/activity/updateStatus/'
    let param = {
        activity_id: payload.id,
        result: status,
        deal_time: new Date().getTime()
    }
    return $$.post(url,param)
}
