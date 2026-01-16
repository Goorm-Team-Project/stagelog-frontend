import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ConcertCard from '@/components/ConcertCard'
import PostCard from '@/components/PostCard'
import SearchIcon from '@mui/icons-material/Search'
import MovingIcon from '@mui/icons-material/Moving'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { ConcertService } from '@/services/ConcertService'
import { PostService } from '@/services/PostService'

const MAX_PREVIEW = 4 // 미리보기 최대 개수

export default function SearchPage() {
    const [concerts, setConcerts] = useState<Array<{
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
    const [posts, setPosts] = useState(Array<{
    post_id: number;
    event: {
        event_id: number;
        title: string;
    }
    user_id: number;
    nickname: string;
    created_at: string;
    title: string;
    content: string;
    like: number;
    dislike: number;
    views: number;
    category?: string;
  }>())
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') ?? ''
    const [inputValue, setInputValue] = useState(query)
    const navigate = useNavigate()

    const handleSearch = () => {
        navigate(`/search?q=${inputValue}`)
    }

    useEffect(() => {
        ConcertService.getConcertList({
                    search: query,
                    sort: 'latest',
                    page: 1,
                })
                .then((res) => {
                    // TODO: 공연 목록 업데이트
                    setConcerts(res.data.data.events)
                })
                .catch((error) => {
                    console.error('Error fetching concert list:', error)
                })

        PostService.getPostList({
              category: undefined,
              search: query,
              sort: 'latest',
              page: 1,
            })
            .then((res) => {
              const responseData = res.data.data
              setPosts(responseData.posts)
            })
            .catch((error) => {
              console.error('Error fetching posts:', error)
            })
    }, [query])

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
                    공연 <span className="text-black font-medium">{concerts.length}</span>
                </span>
                <span className="text-gray-400">
                    게시글 <span className="text-black font-medium">{posts.length}</span>
                </span>
                {/* <span className="text-gray-400">
                    뱃지 <span className="text-black font-medium">1</span>
                </span> */}
            </p>


            {/* 공연 검색 결과 */}
            <section className="space-y-3">
                {concerts.length === 0 && (
                        <p className="text-gray-500 text-center">검색 결과가 없습니다.</p>
                    )}
                <div className="flex gap-8 overflow-x-auto pb-2">
                    {concerts.slice(0, MAX_PREVIEW).map((concert) => (
                        <ConcertCard key={concert.event_id} {...concert} />
                    ))}
                </div>
                {concerts.length > MAX_PREVIEW && (
                    <button
                    onClick={() => navigate(`/concerts?search=${query}`)}
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

                {posts.length === 0 && (
                    <p className="text-gray-500 text-center">검색 결과가 없습니다.</p>
                )}
                <div className="space-y-3">
                    {posts.slice(0, MAX_PREVIEW).map((post) => (
                        <PostCard key={post.post_id} {...post} />
                    ))}
                </div>

                {posts.length > MAX_PREVIEW && (
                    <button
                        onClick={() => navigate(`/community?q=${query}`)}
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

            {/* 뱃지
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
            </section> */}
        </main>
    )
}
