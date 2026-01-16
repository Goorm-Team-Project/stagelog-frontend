import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { PostService } from '@/services/PostService'
import { CommentService } from '@/services/CommentService'
import { useAuth } from '@/hooks/useAuth'

type ReactionType = 'like' | 'dislike' | null

export default function PostPage() {
    const { id } = useParams()
    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()
    const [post, setPost] = useState({
        post_id: 0,
        event_id: 0,
        user_id: 0,
        nickname: '',
        category: '',
        title: '',
        created_at: '',
        updated_at: '',
        views: 0,
        like: 0,
        dislike: 0,
        content: '',
        imageUrl: ''
    })
    const [myReaction, setMyReaction] = useState<ReactionType>(null)
    const [comments, setComments] = useState(Array<{
        comment_id: number,
        user_id: number,
        nickname: string,
        content: string,
        created_at: string
    }>())
    const [totalComments, setTotalComments] = useState(0)
    const [commentContent, setCommentContent] = useState('')

    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(menuAnchorEl)

    const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(e.currentTarget)
    }

    const handleCloseMenu = () => {
        setMenuAnchorEl(null)
    }

    const handleReport = () => {
        handleCloseMenu()
        setReportOpen(true)
    }

    const [reportOpen, setReportOpen] = useState(false)
    const [reportReason, setReportReason] = useState('')
    const [reportDetail, setReportDetail] = useState('')

    function formatKoreanDate(isoString: string) {
        const date = new Date(isoString)

        return date.toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).replace(/\./g, '.').replace(/ /g, ' ').replace(',', '')
    }

    function parseMyReaction(myReaction: {
  like: boolean
  dislike: boolean
}): ReactionType {
  if (myReaction.like) return 'like'
  if (myReaction.dislike) return 'dislike'
  return null
}

    const handleReaction = async (type: 'like' | 'dislike') => {
        if (!isLoggedIn) return

        try {
            // API 호출
            if (type === 'like') {
                await PostService.likePost(post.post_id)
            } else {
                await PostService.dislikePost(post.post_id)
            }

            // optimistic update
            setPost((prev) => {
                let like = prev.like
                let dislike = prev.dislike

                // 같은 반응 다시 누른 경우 → 취소
                if (myReaction === type) {
                    if (type === 'like') like -= 1
                    else dislike -= 1
                }

                // 다른 반응에서 변경
                else if (myReaction) {
                    if (type === 'like') {
                        like += 1
                        dislike -= 1
                    } else {
                        dislike += 1
                        like -= 1
                    }
                }

                // 처음 누른 경우
                else {
                    if (type === 'like') like += 1
                    else dislike += 1
                }

                return { ...prev, like, dislike }
            })

            // myReaction 갱신
            setMyReaction((prev) => (prev === type ? null : type))
        } catch (e) {
            console.error('reaction error', e)
        }
    }

    const handleSubmitComment = () => {
        // TODO: Implement comment submission
        CommentService.createComment(Number(id), commentContent)
            .then((res) => {
                // Handle successful comment submission
                setComments((prev) => [res.data.data, ...prev]) // 최신 댓글 위로
                setTotalComments((prev) => prev + 1)
            })
            .catch((err) => {
                console.error('Error submitting comment:', err)
            })
    }

    useEffect(() => {
        // TODO: Fetch post data from API
        PostService.getPostDetail(Number(id))
            .then((res) => {
                const responseData = res.data.data
                setPost(responseData)
                setMyReaction(parseMyReaction(responseData.my_reaction))
            })
            .catch((err) => {
                console.error('Error fetching post details:', err)
            })

        CommentService.getComments(Number(id), { page: 1 })
            .then((res) => {
                const responseData = res.data.data
                // Handle comments data
                setComments(responseData.comments)
                setTotalComments(responseData.total_count)
            })
            .catch((err) => {
                console.error('Error fetching comments:', err)
            })
    }, [])

    return (
        <main className="mx-auto max-w-layout px-4 py-6 space-y-6">
            {/* 뒤로가기 */}
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-md text-gray-600 hover:text-gray-900"
            >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                이전 화면
            </button>

            {/* 글 헤더 */}
            <section className="space-y-4">
                {/* 제목 라인 */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {/* 카테고리 */}
                        <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600">
                            {post.category}
                        </span>

                        {/* 제목 */}
                        <h1 className="text-xl font-bold text-gray-900">
                            {post.title}
                        </h1>
                    </div>

                    {/* 더보기 */}
                    <div>
                        <IconButton
                            onClick={handleOpenMenu}
                            size="small"
                            aria-label="more"
                            aria-controls={open ? 'post-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <MoreVertIcon sx={{ color: '#9CA3AF' }} />
                        </IconButton>

                        <Menu
                            id="post-menu"
                            anchorEl={menuAnchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            PaperProps={{
                                sx: {
                                    borderRadius: 2,
                                    minWidth: 160,
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.10)',
                                },
                            }}
                        >
                            <MenuItem onClick={handleReport} sx={{ gap: 1 }}>
                                <ReportOutlinedIcon sx={{ fontSize: 18, color: '#ef4444' }} />
                                <span className="text-sm">신고하기</span>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>

                {/* 메타 정보 */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500">
                    <div className='flex items-center gap-1'>
                        <button 
                        onClick={() => navigate(`/users/${post.user_id}`)}
                        className="font-medium text-xl text-gray-900">{post.nickname}</button>
                    </div>
                    <div className='flex items-center gap-1'>
                        <div className='flex items-center gap-3'>
                            <span className="inline-flex items-center gap-1">
                                <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                                {post.views}
                            </span>

                            <span className="inline-flex items-center gap-1">
                                <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
                                {comments.length}
                            </span>

                            <span className="inline-flex items-center gap-1">
                                <ThumbUpOutlinedIcon sx={{ fontSize: 16 }} />
                                {post.like}
                            </span>

                            <span className="inline-flex items-center gap-1">
                                <ThumbDownOutlinedIcon sx={{ fontSize: 16 }} />
                                {post.dislike}
                            </span>
                        </div>

                        <span
                            className="ml-3 text-black"
                        >{formatKoreanDate(post.created_at)}</span>
                    </div>
                </div>

                {/* 구분선 */}
                <hr className="border-gray-200" />
            </section>

            {/* 본문 */}
            <section className="space-y-6">
                {post.imageUrl && (
                    <img
                        src={post.imageUrl}
                        alt=""
                        className="w-full rounded-xl object-cover"
                    />
                )}

                <p className="whitespace-pre-line text-gray-700 leading-7">
                    {post.content}
                </p>
            </section>

            {/* 비로그인 시 */}
            {!isLoggedIn && (
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-gray-50 px-6 py-8 text-center">
                    {/* 아이콘 */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                        <LockOutlinedIcon sx={{ fontSize: 22, color: '#6B7280' }} />
                    </div>

                    {/* 문구 */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                        이 게시글의 <br />
                        <span className="font-semibold text-gray-900">
                            댓글과 반응은 로그인 후 이용
                        </span>
                        할 수 있어요.
                    </p>
                </div>
            )}

            {/* 반응 */}
            {isLoggedIn && (
                <section className="flex overflow-hidden rounded-full border bg-white shadow-sm">
                    <button
                        onClick={() => handleReaction('like')}
                        className={`
    flex-1 flex items-center justify-center gap-2 py-2 font-semibold
    ${myReaction === 'like'
                                ? 'text-pink-600 bg-pink-50'
                                : 'text-gray-500 hover:bg-gray-100'}
  `}
                    >
                        <ThumbUpOutlinedIcon />
                        {post.like}
                    </button>

                    <button
                        onClick={() => handleReaction('dislike')}
                        className={`
    flex-1 flex items-center justify-center gap-2 py-2 font-semibold
    ${myReaction === 'dislike'
                                ? 'text-black bg-gray-200'
                                : 'text-gray-500 hover:bg-gray-100'}
  `}
                    >
                        <ThumbDownOutlinedIcon />
                        {post.dislike}
                    </button>
                </section>
            )}



            {/* 댓글 */}
            <section className="space-y-4 pt-8">
                {/* 댓글 입력 */}
                {isLoggedIn && (
                    <div className="flex gap-2">
                        <input
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            placeholder="댓글을 입력하세요"
                            className="flex-1 rounded-lg border px-3 py-3 text-sm"
                        />
                        <button
                            disabled={!isLoggedIn || !commentContent.trim()}
                            onClick={handleSubmitComment}
                            className="rounded-lg bg-pink-500 px-4 py-1 text-sm text-white hover:bg-pink-600">
                            등록
                        </button>
                    </div>
                )}

                <div className="flex items-center gap-2 font-semibold">
                    <ChatBubbleOutlineIcon fontSize='small' />
                    댓글 {comments.length}
                </div>

                {/* 댓글 리스트 */}
                <div className="space-y-3">
                    {comments.length === 0 ? (
                        <div className="rounded-lg px-4 py-3 text-sm text-gray-500 text-center">
                            댓글이 없습니다.
                        </div>
                    ) : (
                        comments.map((comment, i) => (
                            <div
                                key={i}
                                className="rounded-lg border px-4 py-3 text-sm"
                            >
                                <div className="flex justify-between text-xs text-gray-500">
                                    <div className='flex items-center gap-1'>
                                        <button 
                                        onClick={() => navigate(`/users/${comment.user_id}`)}
                                        className="font-medium text-gray-900">{comment.nickname}</button>
                                    </div>
                                    <span>{formatKoreanDate(comment.created_at)}</span>
                                </div>
                                <p className="mt-1 text-gray-700">
                                    {comment.content}
                                </p>
                            </div>
                        )
                        ))}
                </div>
            </section>
            <Dialog
                open={reportOpen}
                onClose={() => setReportOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle className="font-bold">
                    게시글 신고
                </DialogTitle>

                <DialogContent className="space-y-4">
                    {/* 신고 사유 */}
                    <RadioGroup
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                    >
                        <FormControlLabel value="spam" control={<Radio />} label="스팸 / 광고" />
                        <FormControlLabel value="abuse" control={<Radio />} label="욕설 / 비방" />
                        <FormControlLabel value="duplicate" control={<Radio />} label="도배 / 중복 게시글" />
                        <FormControlLabel value="sexual" control={<Radio />} label="음란 / 부적절한 콘텐츠" />
                        <FormControlLabel value="harassment" control={<Radio />} label="허위 사실 유포" />
                        <FormControlLabel value="etc" control={<Radio />} label="기타" />
                    </RadioGroup>

                    {/* 기타 선택 시 */}
                    {reportReason === 'etc' && (
                        <TextField
                            multiline
                            rows={3}
                            placeholder="신고 사유를 입력해주세요"
                            fullWidth
                            value={reportDetail}
                            onChange={(e) => setReportDetail(e.target.value)}
                        />
                    )}
                </DialogContent>

                <DialogActions className="px-6 pb-4">
                    <Button
                        onClick={() => setReportOpen(false)}
                        color="inherit"
                    >
                        취소
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        disabled={!reportReason}
                        onClick={() => {
                            setReportOpen(false)
                        }}
                    >
                        신고하기
                    </Button>
                </DialogActions>
            </Dialog>

        </main>
    )
}
