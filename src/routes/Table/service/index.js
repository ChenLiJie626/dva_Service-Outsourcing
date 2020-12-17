import $$ from 'cmn-utils';
import {string} from "prop-types";

export async function listAll(payload){
    return $$.get('/activity/list',{
        pageNum : payload,
        pageSize : 5
    });
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
