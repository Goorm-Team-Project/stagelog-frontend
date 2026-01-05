import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

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
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#9CA3AF' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={searchFieldSx}
          />

          <Link
            to="/login"
            className="px-3 py-2 text-xl font-medium text-black rounded-lg"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  )
}
