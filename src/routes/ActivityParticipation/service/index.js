import $$ from 'cmn-utils';

export async function register(payload){
    console.log(payload)
    return $$.get('/activity/register',payload)
}
