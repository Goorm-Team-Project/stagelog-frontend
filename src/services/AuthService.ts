import { tokenManager } from "@/auth/tokenManager"
import httpService from "./httpService"
import type { OAuthProvider } from '@/config/oauthProviders'

export interface LoginRequest {
  email: string
  password: string
}

export interface User {
  id: string
  nickname: string
  level: number
}

export interface LoginResponse {
  user: User
}

export const AuthService = {
  oauthLogin(provider: OAuthProvider, code: string) {
    return httpService.post(`/auth/login/${provider}`, { code })
  },

  refresh() {
    return httpService.post('/auth/login/refresh', {
      refresh_token: tokenManager.getRefresh(),
    })
  }
}

