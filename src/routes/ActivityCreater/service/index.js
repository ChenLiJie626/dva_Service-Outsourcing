import $$ from 'cmn-utils';

export async function getUserActivity(payload){
    const staffId = $$.getStore('user').staffId
    console.log(payload,staffId)
    const data = {
        pageNum : payload,
        pageSize : 5,
        staffID: staffId
    }
    return $$.get("/activity/director", data);
}
