import $$ from 'cmn-utils';

export async function getUserActivity(payload){
    const data = {
        staffId: payload
    }
    return $$.get('/activity/getUserActivity',data);
}
