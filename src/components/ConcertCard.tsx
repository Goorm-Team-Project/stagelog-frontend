import { useState } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PlaceIcon from '@mui/icons-material/Place'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

interface ConcertCardProps {
    imageUrl: string
    artist: string
    title: string
    startDate: string   // "2025-01-15"
    endDate?: string    // "2025-01-17" (없으면 단일)
    location: string
    liked?: boolean
    likeCount?: number
}

type ConcertStatus = 'upcoming' | 'ongoing' | 'ended' // 콘서트 상태

const STATUS_BADGE = { // 콘서트 상태 배지
    upcoming: {
        label: '예정',
        className: 'bg-blue-500',
    },
    ongoing: {
        label: '진행중',
        className: 'bg-pink-500',
    },
    ended: {
        label: '종료',
        className: 'bg-gray-400',
    },
} as const

const parseDate = (date: string) => { // 날짜 문자열을 Date 객체로 변환
    const [y, m, d] = date.split('-').map(Number)
    return new Date(y, m - 1, d)
}

const getConcertStatus = ( // 콘서트 상태 가져오기
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

const formatKoreanDate = (date: string) => { // 날짜 포맷 함수
    const d = new Date(date)

    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()

    return `${year}년 ${month}월 ${day}일`
}

const formatDateRange = (start: string, end?: string) => { // 날짜 범위 포맷 함수
    if (!end || start === end) {
        return formatKoreanDate(start)
    }

    return `${formatKoreanDate(start)} - ${formatKoreanDate(end)}`
}

export default function ConcertCard({
    imageUrl,
    artist,
    title,
    startDate,
    endDate,
    location,
    liked,
    likeCount
}: ConcertCardProps) {
    const status = getConcertStatus(startDate, endDate)
    const [isLiked, setIsLiked] = useState(liked ?? false)

    const toggleLike = () => { // 좋아요 토글 함수
        setIsLiked(prev => !prev)
    }

    return (
        <div className="w-[280px] rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition">
            {/* 이미지 영역 */}
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-[200px] object-cover"
                />

                {/* 좋아요 버튼 (왼쪽 상단) */}
                <button
                    onClick={toggleLike}
                    className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow hover:scale-105 transition"
                >
                    {isLiked ? (
                        <FavoriteIcon sx={{ fontSize: 16 }} className="text-pink-500" />
                    ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 16 }} className="text-gray-600" />
                    )}
                </button>

                {/* 상태 뱃지 (오른쪽 상단) */}
                <span
                    className={`absolute top-3 right-3 text-white text-xs font-semibold px-2 py-1 rounded-full ${STATUS_BADGE[status].className
                        }`}
                >
                    {STATUS_BADGE[status].label}
                </span>
            </div>

            {/* 콘텐츠 */}
            <div className="p-4 space-y-2">
                <span className="text-xs font-semibold text-pink-500">
                    {artist}
                </span>

                <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
                    {title}
                </h3>

                <div className="text-xs text-gray-500 space-y-1">
                    <p><CalendarMonthIcon fontSize="small" /> {formatDateRange(startDate, endDate)}</p>
                    <p><PlaceIcon fontSize="small" /> {location}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-400">
                        <FavoriteBorderIcon fontSize="small" /> {likeCount?.toLocaleString()}
                    </span>

                    <button className="text-xs font-semibold text-white bg-pink-500 px-3 py-1.5 rounded-full hover:bg-pink-600 transition">
                        자세히 보기
                    </button>
                </div>
            </div>
        </div>
    )
}
