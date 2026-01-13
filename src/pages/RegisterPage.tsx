import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PinkSwitch from "@/components/PinkSwitch"
import { AuthService } from "@/services/AuthService"
import { tokenManager } from "@/auth/tokenManager"
import { useAuth } from "@/hooks/useAuth"

const logoClass =
    'text-3xl font-bold leading-[1.25] bg-gradient-to-r from-[#F6339A] to-[#9810FA] bg-clip-text text-transparent'

export default function RegisterPage() {
    const [nickname, setNickname] = useState("")
    const [email, setEmail] = useState("")
    const [notifications, setNotifications] = useState({
        is_email: true,
        is_events: true,
        is_posts: true,
    })
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!nickname || !email) {
            setErrorMessage("닉네임과 이메일을 모두 입력해주세요.")
            return
        }

        AuthService.signup(
            tokenManager.getRegister() || "",
            nickname,
            email,
            notifications.is_email,
            notifications.is_events,
            notifications.is_posts
        )
        .then((res) => {
            // 회원가입 성공 시 처리
            tokenManager.clearRegister()
            // 로그인 처리 (토큰 저장 등)
            const responseData = res.data.data;
            tokenManager.setAccess(responseData.access_token);
            tokenManager.setRefresh(responseData.refresh_token);
            login(responseData.user); // AuthContext에 사용자 정보 저장(백엔드 응답에 user 정보가 있다고 가정)
            // 리다이렉트 또는 상태 업데이트 등 추가 작업 수행
            navigate("/")
        })
        .catch((error) => {
            // 에러 처리
            console.error("회원가입 에러:", error)
            setErrorMessage('회원가입에 실패했습니다. 다시 시도해주세요.')
        })
    }

    return (
        <div className="flex items-center justify-center bg-white px-4 py-[120px]">
            <div className="w-full max-w-sm text-center">
                {/* Logo */}
                <h1 className={logoClass}>
                    <Link to="/" className={logoClass}>
                        StageLog
                    </Link>
                </h1>

                {/* Title */}
                <h2 className="text-lg font-semibold mb-6">
                    간편 회원가입
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-8">
                    StageLog에 회원이 되어 다양한 공연 혜택을 누려보세요!
                </p>

                {/* Nickname */}
                <div className="text-left mb-4">
                    <label className="block text-sm font-medium mb-1">
                        닉네임
                    </label>
                    <input
                        type="text"
                        className="
              w-full rounded-lg border border-gray-300
              px-4 py-2 focus:outline-none focus:ring-2
              focus:ring-pink-400
            "
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div className="text-left mb-6">
                    <label className="block text-sm font-medium mb-1">
                        이메일
                    </label>
                    <input
                        type="email"
                        className="
              w-full rounded-lg border border-gray-300
              px-4 py-2 focus:outline-none focus:ring-2
              focus:ring-pink-400
            "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Toggles */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                        <span>이메일 알림 받기</span>
                        <PinkSwitch
                            checked={notifications.is_email}
                            onChange={(e) =>
                                setNotifications({
                                    ...notifications,
                                    is_email: e.target.checked,
                                })
                            }
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span>공연 정보 알림 받기</span>
                        <PinkSwitch
                            checked={notifications.is_events}
                            onChange={(e) =>
                                setNotifications({
                                    ...notifications,
                                    is_events: e.target.checked,
                                })
                            }
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span>게시글 알림 받기</span>
                        <PinkSwitch
                            checked={notifications.is_posts}
                            onChange={(e) =>
                                setNotifications({
                                    ...notifications,
                                    is_posts: e.target.checked,
                                })
                            }
                        />
                    </div>
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <p className="text-sm text-red-500 mb-4">
                        {errorMessage}
                    </p>
                )}

                {/* Submit */}
                <button
                    className="
            w-full bg-pink-500 text-white
            py-3 rounded-lg font-semibold
            hover:bg-pink-600 transition
          "
                    onClick={handleSubmit}
                >
                    회원정보 저장
                </button>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="mx-2 text-xs text-gray-400">
                        이미 계정이 있으신가요?
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Login Link */}
                <Link to="/login" className="text-pink-500 text-sm font-semibold">
                    로그인하러 가기
                </Link>

                {/* Footer */}
                <p className="mt-6 text-[11px] text-gray-400 leading-relaxed">
                    가입 시 StageLog의{' '}
                    <span className="underline">이용약관</span> 및{' '}
                    <span className="underline">개인정보 처리방침</span>에<br />
                    동의하는 것으로 간주됩니다.
                </p>
            </div>
        </div>
    )
}
