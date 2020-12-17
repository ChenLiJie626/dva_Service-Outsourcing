import $$ from 'cmn-utils';

export async function register(payload) {
  return $$.post('/activity/createUser', payload);
}
