export type OAuthProvider = 'kakao' | 'google' | 'naver'

interface OAuthProviderConfig {
  authUrl: string
  clientId: string
  redirectUri: string
  scope?: string
}

const FRONTEND_ORIGIN = import.meta.env.VITE_FRONTEND_ORIGIN

export const OAUTH_PROVIDERS: Record<OAuthProvider, OAuthProviderConfig> = {
  kakao: {
    authUrl: 'https://kauth.kakao.com/oauth/authorize',
    clientId: import.meta.env.VITE_KAKAO_CLIENT_ID,
    redirectUri: `${FRONTEND_ORIGIN}/auth/kakao/callback`,
  },
  google: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirectUri: `${FRONTEND_ORIGIN}/auth/google/callback`,
    scope: 'https://www.googleapis.com/auth/userinfo.profile'
  },
  naver: {
    authUrl: 'https://nid.naver.com/oauth2.0/authorize',
    clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
    redirectUri: `${FRONTEND_ORIGIN}/auth/naver/callback`,
  },
}
