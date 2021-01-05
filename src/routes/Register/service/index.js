import $$ from 'cmn-utils';

export async function register(payload) {
  return $$.post('/activity/createUser', payload);
}

export async function getAuthCode(payload){
  return $$.get('/activity/getAuthCode', payload)
}

export async function verifyAuthCode(payload){
  console.log(payload)
  return $$.get('/activity/verifyAuthCode', payload)
}
