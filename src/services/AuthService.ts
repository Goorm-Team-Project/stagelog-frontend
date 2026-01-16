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
  // OAuth 로그인
  oauthLogin(provider: OAuthProvider, code: string, state?: string) {
    return httpService.post(`/auth/login/${provider}`, { code, state })
  },

  // 회원가입
  signup(register_token: string, nickname: string, email: string, is_email_sub: boolean, is_events_notification_sub: boolean, is_posts_notification_sub: boolean) {
    return httpService.post('/auth/signup', {
      register_token,
      nickname,
      email,
      is_email_sub,
      is_events_notification_sub,
      is_posts_notification_sub 
    })
  },  

  // 로그인 상태 유지(refresh token으로 access token 재발급)
  refresh() {
    return httpService.post('/auth/login/refresh', {
      refresh_token: tokenManager.getRefresh(),
    })
  },

  // 로그인 상태 유지(access token으로 사용자 정보 조회)
  me() {
    return httpService.get('/auth/keep',
      {
        headers: {
          Authorization: `Bearer ${tokenManager.getAccess()}`,
        },
      }
    )
  },

  // 로그아웃
  logout() {
    return httpService.post('/auth/logout', {
      refresh_token: tokenManager.getRefresh(),
    })
  },

  // 마이페이지 정보 조회
  mypage() {
    return httpService.get('/users/me')
  },

  // 마이페이지 즐겨찾기
  mypageFavorites(params: { page: number; size: number }) {
    return httpService.get('/bookmarks/mypage', { params })
  },

  // 다른 유저 프로필 조회
  getUserProfile(userId: string) {
    return httpService.get(`/users/${userId}`)
  },

  // 내 정보 수정
  updateMyProfile(data: { nickname: string; }) {
    return httpService.patch('/users/me/profile', data)
  },

  // 알림 설정 수정
  updateNotificationSettings(data: {
    is_email_sub: boolean
    is_events_notification_sub: boolean
    is_posts_notification_sub: boolean
  }) {
    return httpService.patch('/users/me/profile', data)
  }
}

