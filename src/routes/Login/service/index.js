import $$ from 'cmn-utils';

export async function login(payload) {
  console.log(payload)
  return $$.get('/activity/LoginUser', payload);
}
export async function timers(payload) {
  return $$.get('/activity/list');
}
