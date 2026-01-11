// auth/tokenManager.ts
let accessToken: string | null = null
let refreshToken: string | null = null
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
    refreshToken = token
  },
  getRefresh() {
    return refreshToken
  },
  clearRefresh() {
    refreshToken = null
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
    refreshToken = null
    registerToken = null
  },
}
