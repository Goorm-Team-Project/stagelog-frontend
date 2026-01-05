import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Link } from 'react-router-dom'

const logoClass =
  'text-2xl font-bold leading-[1.25] bg-gradient-to-r from-[#F6339A] to-[#9810FA] bg-clip-text text-transparent'

export default function Footer() {
  return (
    <footer className="bg-[#0B1220] text-gray-300">
      <div className="mx-auto max-w-layout px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* 브랜드 */}
          <div className="space-y-3">
            <h2 className={logoClass}>
              StageLog
            </h2>
            <p className="text-sm text-gray-400">
              K-POP 공연 정보와
              <br />
              커뮤니티를 한 곳에서
            </p>
          </div>

          {/* 서비스 */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">
              서비스
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">
                <Link to="/concerts">공연정보</Link>
              </li>
              <li className="hover:text-white cursor-pointer">
                <Link to="/community">커뮤니티</Link>
              </li>
            </ul>
          </div>

          {/* 정보 */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">
              정보
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">
                이용약관
              </li>
              <li className="hover:text-white cursor-pointer">
                개인정보처리방침
              </li>
              <li className="hover:text-white cursor-pointer">
                공지사항
              </li>
              <li className="hover:text-white cursor-pointer">
                FAQ
              </li>
            </ul>
          </div>

          {/* 소셜 미디어 */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">
              소셜 미디어
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-white transition"
              >
                <InstagramIcon fontSize="small" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="hover:text-white transition"
              >
                <YouTubeIcon fontSize="small" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-white transition"
              >
                <FacebookIcon fontSize="small" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-white transition"
              >
                <TwitterIcon fontSize="small" />
              </a>
            </div>
          </div>
        </div>

        {/* 하단 카피 */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          © 2026 StageLog. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
