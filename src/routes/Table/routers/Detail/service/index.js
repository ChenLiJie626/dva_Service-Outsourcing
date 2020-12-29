import $$ from 'cmn-utils';

export async function getQRcode(payload) {
    return $$.get('/activity/qrcode',payload)
}

export async function getActivity_info(payload) {
    let url = '/activity/activityInfo/' + payload.id
    return $$.get(url)
}

export async function updatePerson(payload) {
    let url = '/activity/activityInfo/update/' + payload.id
    console.log(url)
    return $$.post(url,payload.limit)
}
