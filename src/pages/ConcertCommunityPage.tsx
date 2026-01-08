import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MovingIcon from '@mui/icons-material/Moving'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SortIcon from '@mui/icons-material/Sort';
import CheckIcon from '@mui/icons-material/Check'
import PostCard from '@/components/PostCard';
import HeroSection from '@/components/HeroSection'

/** 페이지당 게시글 수 */
const PAGE_SIZE = 10

/** 정렬 타입 */
type SortType = 'latest' | 'likes' | 'views'
const SORT_LABEL: Record<SortType, string> = {
  latest: '최신 순',
  likes: '인기 순',
  views: '조회수 순',
}

/** mock 데이터 (나중에 API로 교체) */
const posts = Array.from({ length: 73 }).map((_, i) => ({
  id: i + 1,
  authorName: `사용자${i + 1}`,
  createdAtLabel: '2026-01-01 18:26',
  title: '방탄콘 리얼 후기',
  excerpt:
    '이번 공연 다녀왔는데 생각보다 음향이 좋았어요. 좌석은 3층이었는데도 무대가 잘 보였습니다.',
  likeCount: Math.floor(Math.random() * 100),
  commentCount: Math.floor(Math.random() * 30),
  categoryLabel: ['후기', '질문', '정보'][i % 3],
  concertName: '2025 WORLD TOUR - SEOUL'
}))

export default function ConcertCommunityPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  /** URL 쿼리 */
  const query = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? '전체'
  const page = Number(searchParams.get('page') ?? 1)

  const [inputValue, setInputValue] = useState(query)

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


  /** 페이지 변경 시 스크롤 맨 위 */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [safePage])

  return (
    <>
    <HeroSection 
        concertId={1}
        artist='BLACKPINK'
        concertName='2025 WORLD TOUR - SEOUL'
        startDate='2025-01-01'
        endDate='2025-01-02'
    />
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
              key={post.id}
              {...post}
              onClick={() => navigate(`/posts/${post.id}`)}
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
