import { useEffect, useState } from 'react'
import PinkSwitch from '@/components/PinkSwitch'
import ConcertCard from '@/components/ConcertCard'
import { AuthService } from '@/services/AuthService'
// import { UserBadgeChip } from '@/components/UserBadgeChip'

export default function MyPage() {
  const [user, setUser] = useState({
    nickname: '',
    level: 0,
    exp: 0,
    expText: '',
    id: '',
    email: '',
  })
  const [favoriteConcerts, setFavoriteConcerts] = useState<Array<{
    event_id: number
    poster: string
    title: string
    artist: string
    start_date: string
    end_date?: string
    venue: string
    liked?: boolean
    favorite_count?: number
  }>>([])

  const [alarm, setAlarm] = useState({
    is_email_sub: true,
    is_events_notification_sub: true,
    is_posts_notification_sub: true,
  })

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [nickname, setNickname] = useState(user.nickname)

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const PAGE_SIZE = 9

  const handleEditProfile = () => {
    setIsEditingProfile(true)
  }

  const handleSaveProfile = () => {
    setIsEditingProfile(false)

    // Validate nickname
    if (nickname.trim() === '') {
      return
    }

    // Check if nickname is unchanged
    if (user.nickname === nickname) {
      return
    }

    // Save the updated nickname
    AuthService.updateMyProfile({ nickname })
      .then((res) => {
        // API 응답 처리
        setUser(res.data.data)
        setNickname(res.data.data.nickname)
      })
      .catch((error) => {
        console.error("Error updating profile:", error)
      })
  }

  const handleSaveNotificationSettings = () => {
    // Save the updated notification settings
    AuthService.updateNotificationSettings(alarm)
      .then((res) => {
        // API 응답 처리
        setAlarm({
          is_email_sub: res.data.data.is_email_sub,
          is_events_notification_sub: res.data.data.is_events_notification_sub,
          is_posts_notification_sub: res.data.data.is_posts_notification_sub,
        })
      })
      .catch((error) => {
        console.error("Error updating notification settings:", error)
      })
  }

  const fetchFavorites = (pageNumber: number) => {
    AuthService.mypageFavorites({ page: pageNumber, size: PAGE_SIZE })
      .then((res) => {
        const events = res.data.data.events

        setFavoriteConcerts((prev) =>
          pageNumber === 1 ? events : [...prev, ...events]
        )

        if (events.length < PAGE_SIZE) {
          setHasMore(false)
        }
      })
      .catch((error) => {
        console.error("Error fetching mypage favorites:", error)
      })
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchFavorites(nextPage)
  }

  useEffect(() => {
    AuthService.mypage()
      .then((res) => {
        // API 응답 처리
        setUser(res.data.data)
        setNickname(res.data.data.nickname)
        setAlarm({
          is_email_sub: res.data.data.is_email_sub,
          is_events_notification_sub: res.data.data.is_events_notification_sub,
          is_posts_notification_sub: res.data.data.is_posts_notification_sub,
        })
      })
      .catch((error) => {
        console.error("Error fetching mypage data:", error)
      })

    fetchFavorites(1)
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

      {/* ================= 내 정보 / 알림 ================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 내 정보 */}
        <div className="space-y-3">
          <h2 className="font-bold">내 정보</h2>

          <div className="text-sm border rounded-2xl divide-y">
            {/* ID */}
            <div className="flex justify-between items-center px-5 py-3 h-12">
              <span className="font-bold text-gray-900">ID</span>
              <span>user-{user.id}</span>
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
                  setIsEditingProfile(false)
                }}
                className="w-full rounded-full border px-4 py-2 text-sm"
              >
                취소
              </button>

              <button
                onClick={handleSaveProfile}
                className="w-full rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white"
              >
                저장
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditProfile}
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
                checked={alarm.is_email_sub}
                onChange={(e) =>
                  setAlarm({ ...alarm, is_email_sub: e.target.checked })
                }
              />
            </div>

            <div className="flex justify-between items-center px-5 py-3 h-12">
              <span className="font-bold text-gray-900">공연 정보 알림 받기</span>
              <PinkSwitch
                checked={alarm.is_events_notification_sub}
                onChange={(e) =>
                  setAlarm({ ...alarm, is_events_notification_sub: e.target.checked })
                }
              />
            </div>

            <div className="flex justify-between items-center px-5 py-3 h-12">
              <span className="font-bold text-gray-900">게시글 알림 받기</span>
              <PinkSwitch
                checked={alarm.is_posts_notification_sub}
                onChange={(e) =>
                  setAlarm({ ...alarm, is_posts_notification_sub: e.target.checked })
                }
              />
            </div>
          </div>

          <button
            onClick={handleSaveNotificationSettings}
            className="w-full rounded-full bg-[#FFCC00] px-4 py-2 text-sm font-semibold text-black">
            알림설정 저장
          </button>
        </div>
      </section>

      {/* ================= 즐겨찾기 ================= */}
      <section className="space-y-4">
        <h2 className="font-bold">즐겨찾기</h2>
        {favoriteConcerts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteConcerts.map((concert) => (
              <ConcertCard key={concert.event_id} {...concert} />
            ))}
          </div>
        ) : (
          <div className='w-full text-gray-500 text-sm text-center'>
            즐겨찾기한 공연이 없습니다.
          </div>
        )}
        {favoriteConcerts.length > 0 && hasMore && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="rounded-full border px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              더 보기
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
