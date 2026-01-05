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
  imageUrl: string
  artist: string
  title: string
  startDate: string   // "2025-01-15"
  endDate?: string    // "2025-01-17"
  location: string
  liked?: boolean
  likeCount?: number
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
  startDate: string,
  endDate?: string
): ConcertStatus => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const start = parseDate(startDate)
  const end = endDate ? parseDate(endDate) : start
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
  imageUrl,
  artist,
  title,
  startDate,
  endDate,
  location,
  liked = false,
  likeCount = 0,
}: ConcertCardProps) {
  const navigate = useNavigate()
  const status = getConcertStatus(startDate, endDate)
  const [isLiked, setIsLiked] = useState(liked)

  /* ---- handlers ---- */

  // 카드 전체 클릭 → A 경로
  const handleCardClick = () => {
    navigate('/concerts/1/posts') // 예: 콘서트 목록 / 요약 페이지
  }

  // 자세히 보기 → B 경로
  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate('/concerts/1') // 예: 콘서트 상세 페이지
  }

  // 좋아요
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(prev => !prev)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      className="w-[280px] cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="h-[200px] w-full object-cover"
        />

        {/* Like */}
        <button
          onClick={handleLikeClick}
          className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow transition hover:scale-105"
        >
          {isLiked ? (
            <FavoriteIcon fontSize="small" className="text-pink-500" />
          ) : (
            <FavoriteBorderIcon fontSize="small" className="text-gray-600" />
          )}
        </button>

        {/* Status */}
        <span
          className={`absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-semibold text-white ${STATUS_BADGE[status].className}`}
        >
          {STATUS_BADGE[status].label}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-2 p-4">
        <span className="text-xs font-semibold text-pink-500">
          {artist}
        </span>

        <h3 className="line-clamp-2 text-sm font-bold text-gray-900">
          {title}
        </h3>

        <div className="space-y-1 text-xs text-gray-500">
          <p className="flex items-center gap-1">
            <CalendarMonthIcon fontSize="small" />
            {formatDateRange(startDate, endDate)}
          </p>
          <p className="flex items-center gap-1">
            <PlaceIcon fontSize="small" />
            {location}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <FavoriteBorderIcon fontSize="small" />
            {likeCount.toLocaleString()}
          </span>

          {/* ⭐ 다른 링크 */}
          <button
            onClick={handleDetailClick}
            className="rounded-full bg-pink-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-pink-600"
          >
            자세히 보기
          </button>
        </div>
      </div>
    </div>
  )
}
