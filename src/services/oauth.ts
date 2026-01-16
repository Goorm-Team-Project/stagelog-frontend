import { OAUTH_PROVIDERS } from '@/config/oauthProviders'
import type { OAuthProvider } from '@/config/oauthProviders'

export function startOAuthLogin(provider: OAuthProvider) {
  const config = OAUTH_PROVIDERS[provider]

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
  })

  if (provider === 'naver') {
    const state = crypto.randomUUID()
    sessionStorage.setItem('naver_oauth_state', state)
    params.append('state', state)
  }

  if (config.scope) {
    params.append('scope', config.scope)
  }

  window.location.href = `${config.authUrl}?${params.toString()}`
}
