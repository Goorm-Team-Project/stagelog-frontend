// auth/tokenManager.ts
import Cookies from 'js-cookie';

let accessToken: string | null = null
let registerToken: string | null = null

export const tokenManager = {
  /* access token */
  setAccess(token: string) {
    accessToken = token
  },
  getAccess() {
    return accessToken
  },
  clearAccess() {
    accessToken = null
  },

  getRefresh: () => Cookies.get('refresh_token'),

  /* register token */
  setRegister(token: string) {
    registerToken = token
  },
  getRegister() {
    return registerToken
  },
  clearRegister() {
    registerToken = null
  },

  clearAll() {
    accessToken = null
    Cookies.remove('refresh_token', { path: '/' });
    registerToken = null
  },
}
