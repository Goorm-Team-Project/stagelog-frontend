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

  const [alarm, setAlarm] = useState({
    email: true,
    concert: true,
    post: true,
  })

  const favoriteConcerts = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    imageUrl:
      'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
    artist: 'BTS',
    title: '2025 WORLD TOUR - SEOUL',
    startDate: '2025-01-15',
    endDate: '2025-01-17',
    location: '고척스카이돔',
    liked: true,
    likeCount: 12453,
  }))

  const badges = [
    { name: 'IVE' },
    { name: 'BLACKPINK' },
    { name: 'IU' },
    { name: 'BTS' },
    { name: 'ONCE' },
    { name: 'SMTOWN' },
  ]
  const [selectedBadge, setSelectedBadge] = useState<string>('IVE')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [nickname, setNickname] = useState(user.nickname)
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

      {/* ================= 내 정보 / 알림 ================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 내 정보 */}
        <div className="space-y-3">
          <h2 className="font-bold">내 정보</h2>

          <div className="text-sm border rounded-2xl divide-y">
            {/* ID */}
            <div className="flex justify-between items-center px-5 py-3 h-12">
              <span className="font-bold text-gray-900">ID</span>
              <span>{user.id}</span>
            </div>

            {/* 닉네임 */}
            <div className="flex justify-between items-center px-5 py-3 h-12">
              <span className="font-bold text-gray-900">닉네임</span>

              {isEditingProfile ? (
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="
          w-[160px] rounded-md border px-2 py-1 text-sm
          focus:outline-none focus:ring-2 focus:ring-pink-400
        "
                />
              ) : (
                <span>{nickname}</span>
              )}
            </div>

            {/* 이메일 */}
            <div className="flex justify-between items-center px-5 py-3 h-12">
              <span className="font-bold text-gray-900">이메일</span>
              <span>{user.email}</span>
            </div>
          </div>

          {isEditingProfile ? (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setNickname(user.nickname)
                  setIsEditingProfile(false)
                }}
                className="w-full rounded-full border px-4 py-2 text-sm"
              >
                취소
              </button>

              <button
                onClick={() => {
                  console.log('닉네임 저장:', nickname)
                  setIsEditingProfile(false)
                }}
                className="w-full rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white"
              >
                저장
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingProfile(true)}
              className="w-full rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white"
            >
              회원정보 수정
            </button>
          )}
        </div>

        {/* 알림 설정 */}
        <div className="space-y-3">
          <h2 className="font-bold">알림 설정</h2>

          <div className="text-sm border rounded-2xl divide-y">
            <div className="flex justify-between items-center px-5 py-3 h-12">
              <span className="font-bold text-gray-900">이메일 알림 받기</span>
              <PinkSwitch
                checked={alarm.email}
                onChange={(e) =>
                  setAlarm({ ...alarm, email: e.target.checked })
                }
              />
            </div>

            <div className="flex justify-between items-center px-5 py-3 h-12">
              <span className="font-bold text-gray-900">공연 정보 알림 받기</span>
              <PinkSwitch
                checked={alarm.concert}
                onChange={(e) =>
                  setAlarm({ ...alarm, concert: e.target.checked })
                }
              />
            </div>

            <div className="flex justify-between items-center px-5 py-3 h-12">
              <span className="font-bold text-gray-900">게시글 알림 받기</span>
              <PinkSwitch
                checked={alarm.post}
                onChange={(e) =>
                  setAlarm({ ...alarm, post: e.target.checked })
                }
              />
            </div>
          </div>

          <button className="w-full rounded-full bg-[#FFCC00] px-4 py-2 text-sm font-semibold text-black">
            알림설정 저장
          </button>
        </div>
      </section>

      {/* ================= 즐겨찾기 ================= */}
      <section className="space-y-4">
        <h2 className="font-bold">즐겨찾기</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteConcerts.map((concert) => (
            <ConcertCard key={concert.id} {...concert} />
          ))}
        </div>
      </section>

      {/* ================= 뱃지 ================= */}
      <section className="space-y-4">
        <h2 className="font-bold">뱃지</h2>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {badges.map((badge) => {
            const isSelected = selectedBadge === badge.name

            return (
              <button
                key={badge.name}
                type="button"
                onClick={() => setSelectedBadge(badge.name)}
                className={`
            w-[140px] h-[140px] flex items-center justify-center rounded-lg border transition
            ${isSelected
                    ? 'border-2 border-pink-500'
                    : 'border-gray-200 hover:bg-gray-50'}
          `}
              >
                <UserBadgeChip badge={badge} />
              </button>
            )
          })}
        </div>
      </section>

      {/* ================= 저장 ================= */}
      <div className="flex justify-center pt-6">
        <button className="rounded-full bg-pink-500 px-10 py-3 text-sm font-semibold text-white">
          변경 저장
        </button>
      </div>
    </main>
  )
}
