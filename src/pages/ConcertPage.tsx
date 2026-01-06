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

const PAGE_SIZE = 12
const concerts = [ // 콘서트 데이터 예시
    {
        id: 1,
        imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
        artist: 'BTS',
        title: '2025 WORLD TOUR - SEOUL',
        startDate: '2025-01-15',
        endDate: '2025-01-17',
        location: '올림픽 체조경기장',
        liked: true,
        likeCount: 12453,
    },
    {
        id: 2,
        imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
        artist: 'BLACKPINK',
        title: 'BORN PINK ENCORE CONCERT',
        startDate: '2025-02-10',
        location: '고척스카이돔',
        liked: false,
        likeCount: 9821,
    },
    {
        id: 3,
        imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
        artist: 'NewJeans',
        title: 'GET UP CONCERT',
        startDate: '2025-03-22',
        endDate: '2025-03-23',
        location: 'KSPO DOME',
        liked: true,
        likeCount: 8234,
    },
    {
        id: 4,
        imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
        artist: 'SEVENTEEN',
        title: 'FOLLOW AGAIN TOUR',
        startDate: '2025-04-05',
        endDate: '2025-04-07',
        location: '잠실 올림픽 주경기장',
        liked: false,
        likeCount: 7754,
    },
    {
        id: 5,
        imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
        artist: 'BTS',
        title: '2025 WORLD TOUR - SEOUL',
        startDate: '2025-01-15',
        endDate: '2025-01-17',
        location: '올림픽 체조경기장',
        liked: true,
        likeCount: 12453,
    },
    {
        id: 6,
        imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
        artist: 'BLACKPINK',
        title: 'BORN PINK ENCORE CONCERT',
        startDate: '2025-02-10',
        location: '고척스카이돔',
        liked: false,
        likeCount: 9821,
    },
    {
        id: 7,
        imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
        artist: 'NewJeans',
        title: 'GET UP CONCERT',
        startDate: '2025-03-22',
        endDate: '2025-03-23',
        location: 'KSPO DOME',
        liked: true,
        likeCount: 8234,
    },
    {
        id: 8,
        imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
        artist: 'SEVENTEEN',
        title: 'FOLLOW AGAIN TOUR',
        startDate: '2025-04-05',
        endDate: '2025-04-07',
        location: '잠실 올림픽 주경기장',
        liked: false,
        likeCount: 7754,
    },
    {
        id: 9,
        imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
        artist: 'BTS',
        title: '2025 WORLD TOUR - SEOUL',
        startDate: '2025-01-15',
        endDate: '2025-01-17',
        location: '올림픽 체조경기장',
        liked: true,
        likeCount: 12453,
    },
    {
        id: 10,
        imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
        artist: 'BLACKPINK',
        title: 'BORN PINK ENCORE CONCERT',
        startDate: '2025-02-10',
        location: '고척스카이돔',
        liked: false,
        likeCount: 9821,
    },
    {
        id: 11,
        imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
        artist: 'NewJeans',
        title: 'GET UP CONCERT',
        startDate: '2025-03-22',
        endDate: '2025-03-23',
        location: 'KSPO DOME',
        liked: true,
        likeCount: 8234,
    },
    {
        id: 12,
        imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
        artist: 'SEVENTEEN',
        title: 'FOLLOW AGAIN TOUR',
        startDate: '2025-04-05',
        endDate: '2025-04-07',
        location: '잠실 올림픽 주경기장',
        liked: false,
        likeCount: 7754,
    },
]

type SortType = 'latest' | 'likes' | 'bookmarks'
const SORT_LABEL: Record<SortType, string> = {
    latest: '최신 순',
    likes: '인기 순',
    bookmarks: '즐겨찾기 순',
}

export default function ConcertPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get('q') ?? ''
    const [inputValue, setInputValue] = useState(query)
    const page = Number(searchParams.get('page') ?? 1)
    const totalCount = 36 // 예시: 총 공연 정보 개수 (나중에 API에서 받아올 예정)
    const pageCount = Math.ceil(totalCount / PAGE_SIZE)

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
            page: '1',
            sort: value,
        })
        handleClose()
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [page])

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
                                q: inputValue,
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

                    <MenuItem onClick={() => handleSortChange('bookmarks')}>
                        <div className="flex items-center gap-2">
                            {sort === 'bookmarks' && <CheckIcon fontSize="small" />}
                            즐겨찾기 순
                        </div>
                    </MenuItem>
                </Menu>

                {/* 카드 리스트 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mt-4">
                    {concerts.map((concert) => (
                        <ConcertCard key={concert.id} {...concert} />
                    ))}
                </div>
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center mt-10">
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={(_, value) => {
                        setSearchParams({
                            q: query,
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
