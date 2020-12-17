import $$ from 'cmn-utils';

export async function login(payload) {
  return $$.get('/activity/LoginUser', payload);
}
export async function timers(payload) {
  return $$.get('/activity/list');
}
