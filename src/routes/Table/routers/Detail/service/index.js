import $$ from 'cmn-utils';

export async function getQRcode(payload) {
    return $$.get('/activity/getQRcode',payload)
}
