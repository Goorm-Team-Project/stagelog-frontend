interface UpcomingConcertItemProps {
  event_id: number
  poster: string
  artist: string
  title: string
  start_date: string
  end_date?: string
}

export default function UpcomingConcertItem({
  event_id,
  poster,
  artist,
  title,
  start_date,
  end_date,
}: UpcomingConcertItemProps) {
  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.location.href = `/concerts/${event_id}/posts`
  }

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.location.href = `/concerts/${event_id}`
  }

  const formatKoreanDate = (date: string) => {
  const d = new Date(date)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}

  const formatDateRange = (start: string, end?: string) =>
  end && start !== end
    ? `${formatKoreanDate(start)} - ${formatKoreanDate(end)}`
    : formatKoreanDate(start)

  return (
    <li
      onClick={handleJoinClick}
      className="flex cursor-pointer items-center gap-3 rounded-lg p-2 px-4 transition hover:bg-gray-50"
    >
      {/* 썸네일 */}
      <img
        src={poster}
        alt={title}
        className="h-10 w-10 rounded-md object-cover"
      />

      {/* 텍스트 */}
      <div className="flex-1 overflow-hidden">
        <p className="text-xs font-semibold text-pink-500">
          {artist}
        </p>
        <p className="truncate text-sm font-bold text-gray-900">
          {title}
        </p>
        <p className="text-xs text-gray-500">
          {formatDateRange(start_date, end_date)}
        </p>
      </div>

      {/* 참여하기 */}
      <button
        onClick={handleDetailClick}
        className="rounded-full border border-pink-400 px-3 py-1 text-xs font-semibold text-pink-500 hover:bg-pink-50"
      >
        상세보기
      </button>
    </li>
  )
}
