import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MovingIcon from '@mui/icons-material/Moving'
import HeartIcon from '@mui/icons-material/Favorite'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SortIcon from '@mui/icons-material/Sort';
import CheckIcon from '@mui/icons-material/Check'
import PostCard from '@/components/PostCard';
import HeroSection from '@/components/HeroSection'
import { PostService } from '@/services/PostService'
import { useAuth } from '@/hooks/useAuth'
import { ConcertService } from '@/services/ConcertService'

/** 페이지당 게시글 수 */
const PAGE_SIZE = 10

/** 정렬 타입 */
type SortType = 'latest' | 'likes' | 'views'
const SORT_LABEL: Record<SortType, string> = {
  latest: '최신 순',
  likes: '인기 순',
  views: '조회수 순',
}

export default function ConcertCommunityPage() {
  const navigate = useNavigate()
  const { isLoggedIn, user, addFavorite, removeFavorite } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams()
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
  const [event, setEvent] = useState<{
    event_id: number;
    title: string;
    poster: string;
    artist: string;
    start_date: string;
    end_date: string;
  } | null>(null)

  /** URL 쿼리 */
  const { id } = useParams<{ id: string }>()
  const query = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? '전체'
  const page = Number(searchParams.get('page') ?? 1)

  const [inputValue, setInputValue] = useState(query)
  const [isFavorite, setIsFavorite] = useState(user?.bookmarks.includes(Number(id)) ?? false)

  /** 페이지네이션 계산 */
  const totalCount = posts.length
  const pageCount = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  const safePage = Math.min(Math.max(page, 1), pageCount)
  const startIndex = (safePage - 1) * PAGE_SIZE
  const pagedPosts = posts.slice(startIndex, startIndex + PAGE_SIZE)

  /** 정렬 */
  const sort = (searchParams.get('sort') as SortType) ?? 'latest'
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSortChange = (value: SortType) => {
    setSearchParams({
      q: query,
      category,
      page: '1',
      sort: value,
    })
    handleClose()
  }

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    ConcertService.toggleFavoriteConcert(Number(id))
    .then((res) => {
      setIsFavorite(res.data.data.state === "on" ? true : false)
      if (res.data.data.state === "on") {
        addFavorite(Number(id))
      } else {
        removeFavorite(Number(id))
      }
    })
    .catch((error) => {
      console.error('Error toggling favorite:', error)
    })
  }


  /** 페이지 변경 시 스크롤 맨 위 */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    PostService.getConcertPostList({
      id: Number(id),
      category,
      search: query,
      sort,
      page: safePage
    })
      .then((res) => {
        const responseData = res.data.data
        setPosts(responseData.posts)
        setEvent(responseData.event)
      })
      .catch((error) => {
        console.error('Error fetching posts:', error)
      })
  }, [safePage])

  return (
    <>
      <div className="relative">
        {/* Hero 배경 (전체 폭) */}
        <HeroSection
          concertId={event?.event_id}
          imageUrl={event?.poster}
          artist={event?.artist}
          concertName={event?.title}
          startDate={event?.start_date}
          endDate={event?.end_date}
        />

        {/* ❗ layout 기준 overlay */}
        {isLoggedIn && user && (
          <div className="pointer-events-none absolute inset-0">
            <div className="mx-auto max-w-layout px-6 relative h-full">
              <button
                onClick={handleToggleFavorite}
                className="pointer-events-auto
                   absolute top-6 right-0 z-10
                   flex items-center gap-1
                   rounded-full bg-white/90 px-4 py-2
                   text-gray-700 shadow hover:bg-white transition"
            >
              <HeartIcon
                sx={{
                  fill: isFavorite ? 'url(#heartGradient)' : '#9ca3af',
                }}
              />

              <svg width="0" height="0">
                <defs>
                  <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F6339A" />
                    <stop offset="100%" stopColor="#9810FA" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-sm font-medium">
                즐겨찾기
              </span>
            </button>
          </div>
        </div>
        )}
      </div>
      <main className="mx-auto max-w-layout px-4 py-6 space-y-6">
        {/* 카테고리 필터 */}
        <div className="flex gap-2 text-md justify-center">
          {['전체', '후기', '질문', '정보'].map((c) => (
            <button
              key={c}
              onClick={() =>
                setSearchParams({
                  q: query,
                  category: c,
                  page: '1',
                  sort,
                })
              }
              className={`px-3 py-1 rounded-full border transition ${category === c
                ? 'bg-pink-500 text-white border-pink-500'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* 검색바 */}
        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
          <SearchIcon sx={{ fontSize: 20, color: '#9ca3af' }} />
          <input
            value={inputValue}
            placeholder="입력하세요"
            className="bg-transparent flex-1 outline-none text-xl"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchParams({
                  q: inputValue,
                  page: '1',
                  category,
                })
              }
            }}
          />
        </div>



        {/* 커뮤니티 글 리스트 */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MovingIcon sx={{ color: "#F6339A" }} />
              커뮤니티 글
            </h2>

            <button
              onClick={() => navigate('new')}
              className='px-3 py-1 rounded-full border bg-pink-500 text-white border-pink-500 transition hover:bg-pink-600'
            >
              글쓰기
            </button>
          </div>

          {/* 정렬 버튼 */}
          <button
            onClick={handleOpen}
            className="flex items-center gap-1 px-3 py-1 text-md border rounded-md text-gray-600 hover:bg-gray-50"
          >
            <SortIcon fontSize="small" />
            정렬
            <span className="text-gray-400">· {SORT_LABEL[sort]}</span>

          </button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => handleSortChange('latest')}>
              <div className="flex items-center gap-2">
                {sort === 'latest' && <CheckIcon fontSize="small" />}
                최신 순
              </div>
            </MenuItem>

            <MenuItem onClick={() => handleSortChange('likes')}>
              <div className="flex items-center gap-2">
                {sort === 'likes' && <CheckIcon fontSize="small" />}
                인기 순
              </div>
            </MenuItem>

            <MenuItem onClick={() => handleSortChange('views')}>
              <div className="flex items-center gap-2">
                {sort === 'views' && <CheckIcon fontSize="small" />}
                조회수 순
              </div>
            </MenuItem>
          </Menu>

          {pagedPosts.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              검색 결과가 없습니다.
            </div>
          ) : (
            pagedPosts.map((post) => (
              <PostCard
                key={post.post_id}
                {...post}
              />
            ))
          )}
        </section>

        {/* 페이지네이션 */}
        {pageCount > 1 && (
          <div className="flex justify-center pt-6">
            <Pagination
              count={pageCount}
              page={safePage}
              onChange={(_, value) =>
                setSearchParams({
                  q: query,
                  category,
                  sort,
                  page: value.toString(),
                })
              }
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: ChevronLeftIcon,
                    next: ChevronRightIcon,
                  }}
                  {...item}
                />
              )}
              sx={{
                '& .MuiPaginationItem-root': {
                  minWidth: 28,
                  height: 28,
                  color: '#9ca3af',
                },
                '& .Mui-selected': {
                  backgroundColor: '#111827',
                  color: '#fff',
                },
              }}
            />
          </div>
        )}
      </main>
    </>
  )
}
