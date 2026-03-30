import { tokenManager } from "@/auth/tokenManager";
import { AuthService } from "@/services/AuthService";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  nickname: string;
  level: number;
  bookmarks: number[];
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateNickname: (nickname: string) => void;
  addFavorite: (eventId: number) => void;
  removeFavorite: (eventId: number) => void;
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

  const updateNickname = (nickname: string) => {
    if (!user) return

    setUser({
      ...user,
      nickname
    })
  }

  const addFavorite = (eventId: number) => {
    if (!user) return

    setUser({
      ...user,
      bookmarks: [...user.bookmarks, eventId]
    })
  }

  const removeFavorite = (eventId: number) => {
    if (!user) return

    setUser({
      ...user,
      bookmarks: user.bookmarks.filter(id => id !== eventId)
    })
  }

  useEffect(() => {
    const restoreLogin = async () => {
      // 1️⃣ 쿠키가 있는지 확인하는 로직(!refreshToken)을 아예 지워버립니다.
      try {
        // 2️⃣ 바로 재발급 API를 호출합니다.
        // withCredentials: true 덕분에 HttpOnly 쿠키가 자동으로 전송됩니다.
        const refreshRes = await AuthService.refresh()

        if (refreshRes.data.data.access_token) {
          tokenManager.setAccess(refreshRes.data.data.access_token)

          // 3️⃣ 유저 정보 복구
          const meRes = await AuthService.me()
          setUser(meRes.data.data.user)
        }
      } catch (e) {
        // 4️⃣ 여기서 에러가 나면 진짜로 쿠키가 없거나 만료된 것입니다.
        console.log("자동 로그인 실패 (쿠키 없음 또는 만료)")
        tokenManager.clearAll()
        setUser(null)
      } finally {
        // 5️⃣ 성공하든 실패하든 앱 초기화 완료
        setInitialized(true)
      }
    }

    restoreLogin()
  }, [])

  if (!initialized) {
    return <div>로딩 중...</div>
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, updateNickname, addFavorite, removeFavorite }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
