// auth/tokenManager.ts
const REFRESH_KEY = 'refresh_token'

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

  /* refresh token */
  setRefresh(token: string) {
    localStorage.setItem(REFRESH_KEY, token)
  },

  getRefresh() {
    return localStorage.getItem(REFRESH_KEY)
  },

  clearRefresh() {
    localStorage.removeItem(REFRESH_KEY)
  },

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
    localStorage.removeItem(REFRESH_KEY)
    registerToken = null
  },
}
