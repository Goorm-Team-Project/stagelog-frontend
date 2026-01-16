import { AuthService } from "@/services/AuthService"
import { useEffect, useState } from "react"

export default function MyPage() {
  const [user, setUser] = useState({
      nickname: '',
      level: 0,
      exp: 0,
      expText: '',
      id: '',
      email: '',
    })

  useEffect(() => {
      AuthService.mypage()
        .then((res) => {
          // API 응답 처리
          setUser(res.data.data)
        })
        .catch((error) => {
          console.error("Error fetching mypage data:", error)
        })
    }, [])
  return (
    <main className="mx-auto max-w-[1024px] px-4 py-8 space-y-10">
      {/* ================= 프로필 ================= */}
      <section className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">{user.nickname}</h1>
        </div>

        <p className="text-sm text-gray-500">
          공연과 커뮤니티 활동을 통해 레벨을 올려보세요.
          <br />
          다양한 혜택과 뱃지를 획득할 수 있습니다.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-bold">레벨</h2>

        <div className="flex items-center gap-4 rounded-xl border p-6 bg-white">
          {/* Lv */}
          <span className="text-md font-semibold text-gray-900 min-w-[48px]">
            Lv.{user.level}
          </span>

          {/* Progress Bar */}
          <div className="flex-1 h-3 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-pink-500 transition-all"
              style={{ width: `${(user.exp / 120) * 100}%` }}
            />
          </div>

          {/* EXP */}
          <span className="text-md text-gray-600 min-w-[80px] text-right">
            {user.exp} / 120 exp
          </span>
        </div>
      </section>
    </main>
  )
}
