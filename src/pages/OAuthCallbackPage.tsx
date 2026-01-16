import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { AuthService } from '@/services/AuthService'
import type { OAuthProvider } from '@/config/oauthProviders'
import { tokenManager } from '@/auth/tokenManager'

export default function OAuthCallbackPage() {
  const { provider } = useParams<{ provider: OAuthProvider }>()
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    if (!provider) {
      navigate('/login')
      return
    }

    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const state = params.get('state')

    if (provider === 'naver') {
      const savedState = sessionStorage.getItem('naver_oauth_state')

      if (!state || state !== savedState) {
        console.error('Invalid OAuth state')
        navigate('/login')
        return
      }
    }

    AuthService.oauthLogin(provider, code ?? '', state ?? undefined)
      .then((res) => {
        const responseData = res.data.data

        if (responseData.register_token) {
          tokenManager.setRegister(responseData.register_token)
          navigate('/register', {
            state: {
              registerToken: responseData.register_token,
              provider,
            },
          })
          return
        }

        if (responseData.access_token) {
          tokenManager.setAccess(responseData.access_token)
          tokenManager.setRefresh(responseData.refresh_token)
          login(responseData.user)
          navigate('/')
        }
      })
      .catch((error) => {
        console.error('로그인 에러:', error)
        navigate('/login')
      })
  }, [provider, navigate])
  return (
    <div className="h-screen flex items-center justify-center">
      로그인 처리 중...
    </div>
  )
}
