import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MovingIcon from '@mui/icons-material/Moving'
import PostCard from '@/components/PostCard';

/** 페이지당 게시글 수 */
const PAGE_SIZE = 10

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
  userBadgeName: i % 2 === 0 ? 'BLACKPINK' : undefined,
  categoryLabel: ['후기', '질문', '정보'][i % 3],
  concertName: '2025 WORLD TOUR - SEOUL'
}))

export default function CommunityPage() {
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

  /** 페이지 변경 시 스크롤 맨 위 */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [safePage])

  return (
    <main className="mx-auto max-w-layout px-4 py-6 space-y-6">
      {/* 검색바 */}
      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
        <SearchIcon sx={{ fontSize: 20, color: '#9ca3af' }} />
        <input
          value={inputValue}
          placeholder="커뮤니티 검색"
          className="bg-transparent flex-1 outline-none text-sm"
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

      {/* 카테고리 필터 */}
      <div className="flex gap-2 text-md">
        {['전체', '후기', '질문', '정보'].map((c) => (
          <button
            key={c}
            onClick={() =>
              setSearchParams({
                q: query,
                category: c,
                page: '1',
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

      {/* 커뮤니티 글 리스트 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MovingIcon sx={{ color: "#F6339A" }} />
          커뮤니티 인기글
        </h2>

        {pagedPosts.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            검색 결과가 없습니다.
          </div>
        ) : (
          pagedPosts.map((post) => (
            <PostCard
              key={post.id}
              {...post}
              onClick={() => navigate(`/community/${post.id}`)}
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
  )
}
