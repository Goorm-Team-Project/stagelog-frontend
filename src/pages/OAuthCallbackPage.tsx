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

    if (!code) {
      navigate('/login')
      return
    }

    AuthService.oauthLogin(provider, code)
    .then((res) => {
      // 백엔드 응답 구조: res.data = { success, message, data: { ... } }
      const responseData = res.data.data;

      // 1. 회원가입이 필요한 경우 (register_token이 있는 경우)
      if (responseData.register_token) {
        tokenManager.setRegister(responseData.register_token);
        navigate('/register', { 
          state: { 
            registerToken: responseData.register_token,
            provider: provider 
          } 
        });
        return;
      }

      // 2. 로그인 성공 (access_token이 있는 경우)
      if (responseData.access_token) {
        tokenManager.setAccess(responseData.access_token);
        tokenManager.setRefresh(responseData.refresh_token);
        login(responseData.user); // AuthContext에 사용자 정보 저장(백엔드 응답에 user 정보가 있다고 가정)
        navigate('/');
      }
    })
    .catch((error) => {
      console.error('로그인 에러:', error);
      navigate('/login');
    });
  }, [])

  return (
    <div className="h-screen flex items-center justify-center">
      로그인 처리 중...
    </div>
  )
}
