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
    const status = error.response?.status

    // 1. 403 Forbidden: 이미 IP 밴 된 상태
    if (status === 403 || status === 429) {
      // 대시보드나 홈으로 접근하지 못하도록 완전 차단 페이지로 리다이렉트
      tokenManager.clearAll(); 
      router.navigate('/error/banned'); 
      return Promise.reject(error);
    }

    // 2. 429 Too Many Requests: 이번 요청으로 인해 IP 밴 됨
    if (status === 429) {
      // 대시보드나 홈으로 접근하지 못하도록 완전 차단 페이지로 리다이렉트
      tokenManager.clearAll(); 
      router.navigate('/error/rate-limit'); 
      return Promise.reject(error);
    }

    // 3. 401 Unauthorized: 기존 토큰 갱신 로직
    if (
      status === 401 &&
      !original._retry
    ) {
      original._retry = true

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
