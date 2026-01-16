import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PlaceIcon from '@mui/icons-material/Place'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

/* =======================
   Types
======================= */

interface ConcertCardProps {
  event_id: number
  poster: string
  artist: string
  title: string
  start_date: string   // "2025-01-15"
  end_date?: string    // "2025-01-17"
  venue: string
  favorite_count?: number
}

/* =======================
   Status
======================= */

type ConcertStatus = 'upcoming' | 'ongoing' | 'ended'

const STATUS_BADGE: Record<
  ConcertStatus,
  { label: string; className: string }
> = {
  upcoming: { label: '예정', className: 'bg-blue-500' },
  ongoing: { label: '진행중', className: 'bg-pink-500' },
  ended: { label: '종료', className: 'bg-gray-400' },
}

/* =======================
   Utils
======================= */

const parseDate = (date: string) => {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const getConcertStatus = (
  start_date: string,
  end_date?: string
): ConcertStatus => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const start = parseDate(start_date)
  const end = end_date ? parseDate(end_date) : start
  end.setHours(23, 59, 59, 999)

  if (today < start) return 'upcoming'
  if (today > end) return 'ended'
  return 'ongoing'
}

const formatKoreanDate = (date: string) => {
  const d = new Date(date)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}

const formatDateRange = (start: string, end?: string) =>
  end && start !== end
    ? `${formatKoreanDate(start)} - ${formatKoreanDate(end)}`
    : formatKoreanDate(start)

/* =======================
   Component
======================= */

export default function ConcertCard({
  event_id,
  poster,
  artist,
  title,
  start_date,
  end_date,
  venue,
  favorite_count = 0,
}: ConcertCardProps) {
  const navigate = useNavigate()
  const status = getConcertStatus(start_date, end_date)

  /* ---- handlers ---- */

  // 카드 전체 클릭 → A 경로
  const handleCardClick = () => {
    navigate(`/concerts/${event_id}/posts`) // 예: 콘서트 목록 / 요약 페이지
  }

  // 자세히 보기 → B 경로
  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/concerts/${event_id}`)
  }


  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      className="w-[280px] h-[420px] cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg flex flex-col"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={poster}
          alt={title}
          className="h-[200px] w-full object-cover"
        />

        <span
          className={`absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-semibold text-white ${STATUS_BADGE[status].className}`}
        >
          {STATUS_BADGE[status].label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* ===== 위 (가변 영역) ===== */}
        <div className="space-y-1">
          <span className="block text-xs font-semibold text-pink-500 line-clamp-2 min-h-[2rem]">
            {artist}
          </span>

          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 min-h-[2rem]">
            {title}
          </h3>
        </div>

        {/* ===== 아래 (고정 영역) ===== */}
        <div className="mt-auto space-y-3">
          {/* 날짜 / 장소 */}
          <div className="space-y-1 text-xs text-gray-500">
            <p className="flex items-center gap-1">
              <CalendarMonthIcon fontSize="small" />
              {formatDateRange(start_date, end_date)}
            </p>
            <p className="flex items-center gap-1 truncate">
              <PlaceIcon fontSize="small" />
              {venue}
            </p>
          </div>

          {/* 좋아요 / 버튼 */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <FavoriteBorderIcon fontSize="small" />
              {favorite_count.toLocaleString()}
            </span>

            <button
              onClick={handleDetailClick}
              className="rounded-full bg-pink-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-pink-600"
            >
              자세히 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
