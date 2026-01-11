// services/interceptor.ts
import httpService from './httpService'
import { tokenManager } from '@/auth/tokenManager'
import { AuthService } from './AuthService'
import { router } from '@/router'

let isRefreshing = false
let queue: ((token: string) => void)[] = []

function flushQueue(token: string) {
  queue.forEach((cb) => cb(token))
  queue = []
}

/* =========================
 * REQUEST
 * ========================= */
httpService.interceptors.request.use((config) => {
  const url = config.url ?? ''

  // access token 붙이면 안 되는 요청
  if (
    url.includes('/auth/login/refresh') ||
    url.includes('/auth/signup')
  ) {
    return config
  }

  const accessToken = tokenManager.getAccess()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

/* =========================
 * RESPONSE
 * ========================= */
httpService.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config 

    if (
      error.response?.status === 401 &&
      !original._retry
    ) {
      original._retry = true

      // refresh token 없으면 즉시 로그아웃
      if (!tokenManager.getRefresh()) {
        tokenManager.clearAll()
        router.navigate('/login')
        return Promise.reject(error)
      }

      if (!isRefreshing) {
        isRefreshing = true
        try {
          const res = await AuthService.refresh()
          const { accessToken } = res.data

          tokenManager.setAccess(accessToken)

          isRefreshing = false
          flushQueue(accessToken)
        } catch (e) {
          isRefreshing = false
          tokenManager.clearAll()
          router.navigate('/login')
          return Promise.reject(e)
        }
      }

      return new Promise((resolve) => {
        queue.push((newAccess) => {
          original.headers.Authorization = `Bearer ${newAccess}`
          resolve(httpService(original))
        })
      })
    }

    return Promise.reject(error)
  },
)

export {}
