import { useState } from 'react'
import PinkSwitch from '@/components/PinkSwitch'
import ConcertCard from '@/components/ConcertCard'
import { UserBadgeChip } from '@/components/UserBadgeChip'

export default function MyPage() {
  /* ===== mock ===== */
  const user = {
    nickname: '나의 닉네임',
    level: 5,
    exp: 75,
    expText: '75 / 100 exp',
    id: 'test_id15348',
    email: 'test_id15348@test.com',
  }

  const badges = [
    { name: 'IVE' },
    { name: 'BLACKPINK' },
    { name: 'IU' },
    { name: 'BTS' },
    { name: 'ONCE' },
    { name: 'SMTOWN' },
  ]
  return (
    <main className="mx-auto max-w-[1024px] px-4 py-8 space-y-10">
      {/* ================= 프로필 ================= */}
      <section className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">{user.nickname}</h1>
          <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
            IVE
          </span>
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
            Lv.5
          </span>

          {/* Progress Bar */}
          <div className="flex-1 h-3 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-pink-500 transition-all"
              style={{ width: `60%` }}
            />
          </div>

          {/* EXP */}
          <span className="text-md text-gray-600 min-w-[80px] text-right">
            75 / 120 exp
          </span>
        </div>
      </section>


      {/* ================= 뱃지 ================= */}
        <section className="space-y-4">
        <h2 className="font-bold">뱃지</h2>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {badges.map((badge) => (
            <div
                key={badge.name}
                className="
                w-[140px] h-[140px]
                flex items-center justify-center
                rounded-lg border border-gray-200
                bg-white
                "
            >
                <UserBadgeChip badge={badge} />
            </div>
            ))}
        </div>
        </section>
    </main>
  )
}
