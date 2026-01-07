interface UpcomingConcertItemProps {
  concertId: number
  imageUrl: string
  artist: string
  title: string
  dateLabel: string
}

export default function UpcomingConcertItem({
  concertId,
  imageUrl,
  artist,
  title,
  dateLabel,
}: UpcomingConcertItemProps) {
  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.location.href = `/concerts/${concertId}`
  }

  return (
    <li
      className="flex cursor-pointer items-center gap-3 rounded-lg p-2 px-4 transition hover:bg-gray-50"
    >
      {/* 썸네일 */}
      <img
        src={imageUrl}
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
          {dateLabel}
        </p>
      </div>

      {/* 참여하기 */}
      <button
        onClick={handleJoinClick}
        className="rounded-full border border-pink-400 px-3 py-1 text-xs font-semibold text-pink-500 hover:bg-pink-50"
      >
        참여하기
      </button>
    </li>
  )
}
