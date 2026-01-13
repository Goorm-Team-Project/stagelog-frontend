import { tokenManager } from "@/auth/tokenManager";
import { AuthService } from "@/services/AuthService";
import { createContext, useEffect, useState } from "react";

interface User {
  id: string;
  nickname: string;
  level: number;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [initialized, setInitialized] = useState(false)

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = async () => {
    try {
      await AuthService.logout()
    } catch (e) {
      // 서버 실패해도 무조건 로그아웃
    } finally {
      tokenManager.clearAll()
      setUser(null)
    }
  }

  useEffect(() => {
    const restoreLogin = async () => {
      const refreshToken = tokenManager.getRefresh()

      // refresh token 없으면 로그인 시도 안 함
      if (!refreshToken) {
        setInitialized(true)
        console.log("No refresh token found")
        return
      }

      try {
        // 1️⃣ access token 재발급
        const refreshRes = await AuthService.refresh()
        tokenManager.setAccess(refreshRes.data.data.access_token)

        // 2️⃣ 유저 정보 복구
        const meRes = await AuthService.me()
        setUser(meRes.data.data.user)
      } catch (e) {
        // refresh 실패 = 로그아웃 상태
        tokenManager.clearAll()
        setUser(null)
      } finally {
        // 3️⃣ 앱 초기화 완료
        setInitialized(true)
      }
    }

    restoreLogin()
  }, [])

  if (!initialized) {
    return <div>로딩 중...</div>
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
