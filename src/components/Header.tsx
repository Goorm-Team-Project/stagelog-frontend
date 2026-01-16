import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useAuth } from '@/hooks/useAuth'
import { NotificationService } from '@/services/NotificationService'
import NotificationMenu from './NotificationMenu'

const logoClass =
  'text-3xl font-bold leading-[1.25] bg-gradient-to-r from-[#F6339A] to-[#9810FA] bg-clip-text text-transparent'

const navClass =
  'flex gap-12 text-xl font-medium text-[#364153] [&_a]:inline-flex [&_a]:items-center [&_a]:px-3 [&_a]:py-1.5'

const searchFieldSx = {
  width: 300,
  '& .MuiOutlinedInput-root': {
    borderRadius: '25px',
    fontSize: '16px',
    backgroundColor: '#F3F4F6',
    '& fieldset': { borderColor: '#F3F4F6' },
    '&:hover fieldset': { borderColor: '#F3F4F6' },
    '&.Mui-focused fieldset': { borderColor: '#F3F4F6' },
  },
}

export default function Header() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [notiAnchorEl, setNotiAnchorEl] = useState<HTMLElement | null>(null)
  const [hasNotification, setHasNotification] = useState(false)

  const { user, isLoggedIn, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSearch = () => {
    if (!keyword.trim()) return
    navigate(`/search?q=${encodeURIComponent(keyword.trim())}`)
  }

  useEffect(() => {
    if (!isLoggedIn) return

    NotificationService.checkNotification().then(res => {
      setHasNotification(res.data.data.has_unread)
    })
  }, [isLoggedIn])

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-layout px-6 h-20 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-16 py-4">
          <Link to="/" className={logoClass}>
            StageLog
          </Link>

          <nav className={navClass}>
            <Link to="/concerts">공연정보</Link>
            <Link to="/community">커뮤니티</Link>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-12">
          <TextField
            size="small"
            placeholder="검색"
            variant="outlined"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#9CA3AF', cursor: 'pointer' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={searchFieldSx}
          />

          <div className="flex items-center gap-6">
            {/* 🔔 알림 버튼 */}
            {isLoggedIn && (
              <>
                <IconButton
                  sx={{ position: 'relative' }}
                  onClick={(e) => {
                    setNotiAnchorEl(prev =>
                      prev ? null : e.currentTarget
                    )
                  }}
                >
                  <NotificationsNoneIcon sx={{ fontSize: 28, color: 'black' }} />

                  {hasNotification && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                  )}
                </IconButton>
                <NotificationMenu
                  anchorEl={notiAnchorEl}
                  open={Boolean(notiAnchorEl)}
                  onClose={() => setNotiAnchorEl(null)}
                  onAllRead={() => setHasNotification(false)}
                />
              </>
            )}

            {/* 👤 사용자 버튼 */}
            {isLoggedIn ? (
              <>
                <IconButton onClick={handleMenuOpen}>
                  {/* 프로필 원 */}
                  <PersonOutlineIcon sx={{ fontSize: 28, color: 'black' }} />
                </IconButton>

                {/* ▼ 드롭다운 메뉴 */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{
                    sx: {
                      borderRadius: '16px',
                      minWidth: 180,
                      padding: 1,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    },
                  }}
                >
                  {/* 유저 정보 */}
                  <div className="flex flex-col items-start gap-2 px-2">
                    <span className="px-2 py-0.5 text-xs font-semibold text-pink-600 bg-pink-100 rounded-full">
                      Lv. {user?.level}
                    </span>

                    <div className="pl-2 text-lg font-bold text-black">
                      {user?.nickname}
                    </div>
                  </div>

                  <div className="my-1 h-px w-full bg-gray-200" />


                  <MenuItem
                    onClick={() => {
                      handleMenuClose()
                      navigate('/mypage')
                    }}
                  >
                    마이 페이지
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleMenuClose()
                      logout()
                    }}
                    sx={{ color: '#6B7280' }}
                  >
                    로그아웃
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 text-xl font-medium text-black rounded-lg"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
