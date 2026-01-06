import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import ConcertCard from '@/components/ConcertCard'
import PostCard from '@/components/PostCard'
import SearchIcon from '@mui/icons-material/Search'
import MovingIcon from '@mui/icons-material/Moving'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'

const MAX_PREVIEW = 4 // 미리보기 최대 개수
const concerts = [
    {
        id: 1,
        title: "2025 WORLD TOUR - SEOUL",
        artist: 'BLACKPINK',
        startDate: "2025-01-18",
        endDate: "2025-01-19",
        location: "고척돔",
        imageUrl: "https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg",
        likeCount: 523,
    },
    {
        id: 2,
        title: "BORN PINK ENCORE CONCERT",
        artist: 'BLACKPINK',
        startDate: "2024-12-25",
        endDate: "2024-12-26",
        location: "잠실종합운동장",
        imageUrl: "https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg",
        likeCount: 412,
    },
]

const posts = [
    {
        id: 1,
        title: "블랙핑크 콘서트 좌석 질문",
        excerpt: "고척돔 3층 시야 어떤가요?",
        authorName: "사용자123",
        createdAtLabel: "5분 전",
        likeCount: 24,
        commentCount: 13,
        userBadgeName: "BLACKPINK",
        categoryLabel: "질문",
    },
    {
        id: 2,
        title: "블랙핑크 굿즈 정보",
        excerpt: "현장 구매 줄 많이 길까요?",
        authorName: "사용자456",
        createdAtLabel: "1시간 전",
        likeCount: 18,
        commentCount: 7,
        userBadgeName: "BLACKPINK",
        categoryLabel: "정보",
    },
    {
        id: 1,
        title: "블랙핑크 콘서트 좌석 질문",
        excerpt: "고척돔 3층 시야 어떤가요?",
        authorName: "사용자123",
        createdAtLabel: "5분 전",
        likeCount: 24,
        commentCount: 13,
        userBadgeName: "BLACKPINK",
        categoryLabel: "질문",
    },
    {
        id: 2,
        title: "블랙핑크 굿즈 정보",
        excerpt: "현장 구매 줄 많이 길까요?",
        authorName: "사용자456",
        createdAtLabel: "1시간 전",
        likeCount: 18,
        commentCount: 7,
        userBadgeName: "BLACKPINK",
        categoryLabel: "정보",
    },
    {
        id: 1,
        title: "블랙핑크 콘서트 좌석 질문",
        excerpt: "고척돔 3층 시야 어떤가요?",
        authorName: "사용자123",
        createdAtLabel: "5분 전",
        likeCount: 24,
        commentCount: 13,
        userBadgeName: "BLACKPINK",
        categoryLabel: "질문",
    },
    {
        id: 2,
        title: "블랙핑크 굿즈 정보",
        excerpt: "현장 구매 줄 많이 길까요?",
        authorName: "사용자456",
        createdAtLabel: "1시간 전",
        likeCount: 18,
        commentCount: 7,
        userBadgeName: "BLACKPINK",
        categoryLabel: "정보",
    },
]
export default function SearchPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') ?? ''
    const [inputValue, setInputValue] = useState(query)
    const navigate = useNavigate()

    const handleSearch = () => {
        navigate(`/search?q=${inputValue}`)
    }

    return (
        <main className="mx-auto max-w-layout px-4 py-6 space-y-10">
            {/* 검색바 */}
            <div className="flex items-center gap-4 bg-gray-100 rounded-full px-4 py-2">
                <SearchIcon
                    sx={{
                        fontSize: 20,
                        color: '#9ca3af', // gray-400
                    }}
                />
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch()
                        }
                    }}
                    placeholder="검색어를 입력하세요"
                    className="bg-transparent flex-1 outline-none text-xl"
                />
            </div>

            {/* 검색 결과 요약 */}
            <p className="text-xl flex items-center gap-2">
                {/* 왼쪽 */}
                <span className="font-semibold text-black">
                    · {query} 검색 결과
                </span>

                {/* 구분선 */}
                <span className="text-gray-300">|</span>

                {/* 오른쪽 */}
                <span className="text-gray-400">
                    공연 <span className="text-black font-medium">2</span>
                </span>
                <span className="text-gray-400">
                    게시글 <span className="text-black font-medium">14</span>
                </span>
                <span className="text-gray-400">
                    뱃지 <span className="text-black font-medium">1</span>
                </span>
            </p>


            {/* 공연 검색 결과 */}
            <section className="space-y-3">
                <div className="flex gap-8 overflow-x-auto pb-2">
                    {concerts.slice(0, MAX_PREVIEW).map((concert) => (
                        <ConcertCard key={concert.id} {...concert} />
                    ))}
                </div>
                {concerts.length > MAX_PREVIEW && (
                    <button
                    className="
                        w-full flex items-center justify-center gap-1
                        border rounded-xl py-2 shadow-md
                        text-m text-gray-500
                        hover:bg-gray-50
                    "
                >
                    더보기
                    <ArrowDropDownIcon sx={{ fontSize: 20 }} />
                </button>
                )}
            </section>

            {/* 커뮤니티 검색 결과 */}
            <section className="space-y-3">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <MovingIcon sx={{ color: "#F6339A" }} />
                    커뮤니티 글
                </h2>

                <div className="space-y-3">
                    {posts.slice(0, MAX_PREVIEW).map((post) => (
                        <PostCard key={post.id} {...post} />
                    ))}
                </div>

                {posts.length > MAX_PREVIEW && (
                    <button
                        className="
                            w-full flex items-center justify-center gap-1
                            border rounded-xl py-2 shadow-md
                            text-m text-gray-500
                            hover:bg-gray-50
                        "
                    >
                        더보기
                        <ArrowDropDownIcon sx={{ fontSize: 20 }} />
                    </button>
                )}
            </section>

            {/* 뱃지 */}
            <section className="space-y-5">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <LocalOfferIcon sx={{ fontSize: 20, color: '#F6339A' }} />
                    뱃지
                </h2>

                <div className="flex flex-wrap gap-4 items-center">
                    {['BLACKPINK'].map((badge) => (
                        <div
                            key={badge}
                            className="
          w-40 h-40
          border rounded-md border-gray-200
          flex items-center justify-center
        "
                        >
                            <div className="px-3 py-1 rounded-full text-sm bg-black text-white">
                                {badge}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
