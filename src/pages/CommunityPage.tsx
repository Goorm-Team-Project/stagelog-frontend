import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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
import { PostService } from '@/services/PostService'

/** 페이지당 게시글 수 */
const PAGE_SIZE = 10

/** 정렬 타입 */
type SortType = 'latest' | 'popular' | 'views'
const SORT_LABEL: Record<SortType, string> = {
  latest: '최신 순',
  popular: '인기 순',
  views: '조회수 순',
}

export default function CommunityPage() {
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

  /** URL 쿼리 */
  const query = searchParams.get('search') ?? ''
  const category = searchParams.get('category') ?? '전체'
  const page = Number(searchParams.get('page') ?? 1)

  const [inputValue, setInputValue] = useState(query)

  /** 페이지네이션 계산 */
  const [totalCount, setTotalCount] = useState(0)
  const [pageCount, setPageCount] = useState(1)

  const safePage = Math.min(Math.max(page, 1), pageCount)

  /** 정렬 */
  const sort = (searchParams.get('sort') as SortType) ?? 'latest'
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSortChange = (value: SortType) => {
    setSearchParams({
      search: query,
      category,
      page: '1',
      sort: value,
    })
    handleClose()
  }


  /** 페이지 변경 시 스크롤 맨 위 */
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' })

    PostService.getPostList({
      category,
      search: query,
      sort,
      page: safePage,
      size: PAGE_SIZE
    })
      .then((res) => {
        const responseData = res.data.data
        setPosts(responseData.posts)
        setTotalCount(responseData.total_count)
        setPageCount(responseData.total_pages)
      })
      .catch((err) => {
        setError("게시글을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [safePage, category, query, sort])

  return (
    <main className="mx-auto max-w-layout px-4 py-6 space-y-6">
      {/* 카테고리 필터 */}
      <div className="flex gap-2 text-md justify-center">
        {['전체', '후기', '질문', '정보'].map((c) => (
          <button
            key={c}
            onClick={() =>
              setSearchParams({
                search: query,
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
                search: inputValue,
                page: '1',
                category,
              })
            }
          }}
        />
      </div>

      {/* 커뮤니티 글 리스트 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MovingIcon sx={{ color: "#F6339A" }} />
          커뮤니티 글
        </h2>

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

          <MenuItem onClick={() => handleSortChange('popular')}>
            <div className="flex items-center gap-2">
              {sort === 'popular' && <CheckIcon fontSize="small" />}
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

        {isLoading ? (
          <div className="py-20 text-center">로딩 중...</div>
        ) : error ? (
          <div className="py-20 text-center text-red-500">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="mt-2 underline">
              새로고침
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center text-gray-400">검색 결과가 없습니다.</div>
        ) : (
          posts.map((post) => <PostCard key={post.post_id} {...post} />)
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
                search: query,
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
  )
}
