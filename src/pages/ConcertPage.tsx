import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ConcertCard from '@/components/ConcertCard'
import SearchIcon from '@mui/icons-material/Search'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SortIcon from '@mui/icons-material/Sort';
import CheckIcon from '@mui/icons-material/Check'
import { ConcertService } from '@/services/ConcertService'

const PAGE_SIZE = 12

type SortType = 'latest' | 'name' | 'favorite'
const SORT_LABEL: Record<SortType, string> = {
    latest: '최신 순',
    name: '이름 순',
    favorite: '즐겨찾기 순',
}

export default function ConcertPage() {
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
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get('search') ?? ''
    const [inputValue, setInputValue] = useState(query)
    const page = Number(searchParams.get('page') ?? 1)
    const [ totalCount, setTotalCount] = useState(0)
    const [ totalPage, setTotalPage] = useState(0)

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
            search: query,
            page: '1',
            sort: value,
        })
        handleClose()
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })

        ConcertService.getConcertList({
            search: query,
            sort,
            page,
            size: PAGE_SIZE,
        })
        .then((res) => {
            // TODO: 공연 목록 업데이트
            setConcerts(res.data.data.events)
            setTotalCount(res.data.data.total_count)
            setTotalPage(res.data.data.total_pages)
        })
        .catch((error) => {
            console.error('Error fetching concert list:', error)
        })
    }, [page, query, sort])

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
                    placeholder="검색어를 입력하세요"
                    className="bg-transparent flex-1 outline-none text-xl"
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setSearchParams({
                                search: inputValue,
                                page: '1',
                            })
                        }
                    }}
                />
            </div>

            {/* 진행 중인 공연 섹션 */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <WhatshotIcon sx={{ color: "#F6339A" }} />
                        공연 정보
                    </h2>

                </div>

                {/* 정렬 버튼 */}
                <button
                    onClick={handleOpen}
                    className="flex items-center gap-1 px-3 py-1 text-md border rounded-md text-gray-600 hover:bg-gray-50"
                >
                    <SortIcon fontSize="small" />
                    정렬
                    <span className="text-gray-400">{SORT_LABEL[sort]}</span>

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

                    <MenuItem onClick={() => handleSortChange('name')}>
                        <div className="flex items-center gap-2">
                            {sort === 'name' && <CheckIcon fontSize="small" />}
                            이름 순
                        </div>
                    </MenuItem>

                    <MenuItem onClick={() => handleSortChange('favorite')}>
                        <div className="flex items-center gap-2">
                            {sort === 'favorite' && <CheckIcon fontSize="small" />}
                            즐겨찾기 순
                        </div>
                    </MenuItem>
                </Menu>

                {/* 카드 리스트 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mt-4">
                    {concerts.map((concert) => (
                        <ConcertCard key={concert.event_id} {...concert} />
                    ))}
                </div>
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center mt-10">
                <Pagination
                    count={totalPage}
                    page={page}
                    onChange={(_, value) => {
                        setSearchParams({
                            search: query,
                            page: value.toString(),
                            sort,
                        })
                    }}
                    shape="rounded"
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{
                                previous: ChevronLeftIcon,
                                next: ChevronRightIcon,
                            }}
                            {...item}
                        />
                    )}

                />
            </div>
        </main>
    )
}
