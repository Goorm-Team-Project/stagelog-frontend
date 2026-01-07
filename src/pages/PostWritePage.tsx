import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CoverImageUploader from '@/components/CoverImageUploader'

export default function PostWritePage() {
    const navigate = useNavigate()

    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [coverImage, setCoverImage] = useState<File | null>(null)

    const canSubmit = category && title && content

    return (
        <main className="mx-auto max-w-layout px-4 py-8">
            {/* 헤더 */}
            <div className="mb-6 flex items-center gap-2">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-black"
                >
                    <ArrowBackIcon sx={{ fontSize: 18 }} />
                    뒤로가기
                </button>
            </div>

            {/* 카드 */}
            <section className="rounded-2xl border bg-white p-8 shadow-sm space-y-6">
                <h1 className="text-xl font-bold text-gray-900">
                    커뮤니티 글쓰기
                </h1>

                {/* 카테고리 */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                        카테고리
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="
              w-full rounded-lg border px-3 py-2 text-sm appearance-none
              focus:outline-none focus:ring-2 focus:ring-pink-400
            "
                    >
                        <option value="">카테고리를 선택하세요</option>
                        <option value="후기">후기</option>
                        <option value="질문">질문</option>
                        <option value="정보">정보</option>
                    </select>

                </div>

                {/* 제목 */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                        제목
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력해 주세요"
                        className="
              w-full rounded-lg border px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-pink-400
            "
                    />
                </div>

                {/* 내용 */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                        내용
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="콘서트 후기나 나누고 싶은 이야기를 적어주세요"
                        rows={8}
                        className="
              w-full resize-none rounded-lg border px-3 py-3 text-sm
              leading-6 focus:outline-none focus:ring-2 focus:ring-pink-400
            "
                    />
                </div>

                <CoverImageUploader
                    value={coverImage}
                    onChange={setCoverImage}
                />

                {/* 버튼 */}
                <div className="flex justify-center gap-2 pt-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    >
                        취소
                    </button>

                    <button
                        disabled={!canSubmit}
                        className={`
              rounded-lg px-5 py-2 text-sm font-semibold text-white
              ${canSubmit
                                ? 'bg-pink-500 hover:bg-pink-600'
                                : 'bg-gray-300 cursor-not-allowed'}
            `}
                        onClick={() => {
                            console.log({
                                category,
                                title,
                                content,
                            })
                            // TODO: API 연동
                            navigate('/community')
                        }}
                    >
                        등록
                    </button>
                </div>
            </section>
        </main>
    )
}
