import { Link } from 'react-router-dom'
import Kakao from '@/assets/icons/kakao.svg'
import Naver from '@/assets/icons/naver.svg'
import Google from '@/assets/icons/google.svg'

const logoClass =
  'text-4xl font-bold leading-[1.25] bg-gradient-to-r from-[#F6339A] to-[#9810FA] bg-clip-text text-transparent'


export default function LoginPage() {
  const handleKakaoLogin = () => {
    console.log('카카오 로그인')
  }

  const handleNaverLogin = () => {
    console.log('네이버 로그인')
  }

  const handleGoogleLogin = () => {
    console.log('구글 로그인')
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-[480px] rounded-xl bg-white px-8 py-[120px]">
        {/* 로고 */}
        <h1 className={`mb-4 text-center ${logoClass}`}>
          <Link to="/" className={logoClass}>
            StageLog
          </Link>  
        </h1>

        {/* 설명 */}
        <p className="mb-8 text-center text-m text-gray-500">
          공연 정보부터 커뮤니티까지
          <br />
          간편하게 시작하세요!
        </p>

        {/* 로그인 버튼 */}
        <div className="space-y-4">
          {/* 카카오 */}
          <button
            onClick={handleKakaoLogin}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FEE500] py-3 text-m font-semibold text-black hover:brightness-95"
          >
            <img src={Kakao} alt="Kakao Logo" className="h-5" />
            카카오로 로그인
          </button>

          {/* 네이버 */}
          <button
            onClick={handleNaverLogin}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#03C75A] py-3 text-m font-semibold text-white hover:brightness-95"
          >
            <img src={Naver} alt="Naver Logo" className="h-5" />
            네이버로 로그인
          </button>

          {/* 구글 */}
          <button
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 text-m font-semibold text-gray-700 hover:bg-gray-50"
          >
            <img src={Google} alt="Google Logo" className="h-5" />
            Google로 로그인
          </button>
        </div>

        {/* 안내 문구 */}
        <p className="mt-6 text-center text-xs text-gray-400 leading-relaxed">
          로그인 시 StageLog의{' '}
          <span className="underline cursor-pointer font-semibold">
            이용약관
          </span>
          과{' '}
          <span className="underline cursor-pointer font-semibold">
            개인정보 처리방침
          </span>
          에<br />
          동의하는 것으로 간주합니다.
        </p>
      </div>
    </div>
  )
}
