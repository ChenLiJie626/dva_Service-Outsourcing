import $$ from 'cmn-utils';

export async function createActivity(payload){
    return $$.post('/activity/create',payload);
}
