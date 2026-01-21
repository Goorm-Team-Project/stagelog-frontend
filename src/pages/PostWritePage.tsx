import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CoverImageUploader from '@/components/CoverImageUploader'
import { PostService } from '@/services/PostService'
import { UploadService } from '@/services/UploadService'

export default function PostWritePage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit =
    category.trim() &&
    title.trim() &&
    content.trim()

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return

    try {
      setIsSubmitting(true)

      let imageUrl: string | null = null

      // ✅ 1. Presign → S3 PUT
      if (coverImage) {
        const presignRes = await UploadService.presign(
          coverImage.name,
          coverImage.type
        )

        const { upload, file_url } = presignRes.data.data

        await fetch(upload.url, {
          method: upload.method, // PUT
          headers: upload.headers,
          body: coverImage,
        })

        imageUrl = file_url
      }

      // ✅ 2. 게시글 생성
      await PostService.createPost({
        id: Number(id),
        category,
        title,
        content,
        image_url: imageUrl,
      })

      navigate(`/concerts/${id}/posts`)
    } catch (error) {
      console.error('게시글 등록 실패:', error)
      alert('게시글 등록 중 오류가 발생했어요.')
    } finally {
      setIsSubmitting(false)
    }
  }

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

      <section className="rounded-2xl border bg-white p-8 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-gray-900">
          커뮤니티 글쓰기
        </h1>

        {/* 카테고리 */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        >
          <option value="">카테고리 선택</option>
          <option value="후기">후기</option>
          <option value="질문">질문</option>
          <option value="정보">정보</option>
        </select>

        {/* 제목 */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />

        {/* 내용 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          placeholder="내용"
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />

        <CoverImageUploader
          value={coverImage}
          onChange={setCoverImage}
        />

        {/* 버튼 */}
        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg px-4 py-2 text-sm text-gray-600"
          >
            취소
          </button>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className={`rounded-lg px-5 py-2 text-sm font-semibold text-white
              ${canSubmit
                ? 'bg-pink-500 hover:bg-pink-600'
                : 'bg-gray-300 cursor-not-allowed'}
            `}
          >
            {isSubmitting ? '등록 중...' : '등록'}
          </button>
        </div>
      </section>
    </main>
  )
}
