import { OAUTH_PROVIDERS } from '@/config/oauthProviders'
import type { OAuthProvider } from '@/config/oauthProviders'

function generateState() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function startOAuthLogin(provider: OAuthProvider) {
  const config = OAUTH_PROVIDERS[provider]

  if (!config) {
    console.error('OAuth config not found:', provider)
    return
  }

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
  })

  if (provider === 'naver') {
    const state = generateState()          // 🔥 여기만 변경
    sessionStorage.setItem('naver_oauth_state', state)
    params.append('state', state)
  }

  if (config.scope) {
    params.append('scope', config.scope)
  }

  window.location.href = `${config.authUrl}?${params.toString()}`
}
