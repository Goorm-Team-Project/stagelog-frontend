import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined'
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


export default function PostPage() {
    const { postId } = useParams()
    const navigate = useNavigate()

    // mock 데이터 (나중에 API로 교체)
    const post = {
        title: 'BTS 월드투어 서울 공연 후기 (감동의 연속…)',
        category: '후기',
        authorName: '사용자21',
        userBadgeName: 'BLACKPINK',
        createdAt: '2시간 전',
        content: `
이번 공연 다녀왔는데 생각보다 음향이 정말 좋았어요.
좌석은 3층이었는데도 무대가 잘 보였습니다.

특히 마지막 곡에서의 연출은 정말 인상 깊었고,
멤버들 컨디션도 좋아 보여서 만족스러운 공연이었습니다.
    `,
        imageUrl:
            'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
        likeCount: 123,
        dislikeCount: 12,
    }

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


    return (
        <main className="mx-auto max-w-layout px-4 py-6 space-y-6">
            {/* 뒤로가기 */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-black"
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
                            후기
                        </span>

                        {/* 제목 */}
                        <h1 className="text-xl font-bold text-gray-900">
                            BTS 월드투어 서울 공연 후기 (감동의 연속...)
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
                        <span className="font-medium text-gray-900">팬덤_러버</span>

                        <span className="rounded-full bg-black px-2 py-0.5 text-[11px] text-white">
                            IVE
                        </span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <div className='flex items-center gap-3'>
                            <span className="inline-flex items-center gap-1">
                                <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                                1,784
                            </span>

                            <span className="inline-flex items-center gap-1">
                                <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
                                23
                            </span>

                            <span className="inline-flex items-center gap-1">
                                <ThumbUpOutlinedIcon sx={{ fontSize: 16 }} />
                                123
                            </span>

                            <span className="inline-flex items-center gap-1">
                                <ThumbDownOutlinedIcon sx={{ fontSize: 16 }} />
                                23
                            </span>
                        </div>

                        <span
                            className="ml-3 text-black"
                        >2025.12.29 11:12</span>
                    </div>
                </div>

                {/* 구분선 */}
                <hr className="border-gray-200" />
            </section>

            {/* 본문 */}
            <section className="space-y-6">
                <img
                    src={post.imageUrl}
                    alt=""
                    className="w-full rounded-xl object-cover"
                />

                <p className="whitespace-pre-line text-gray-700 leading-7">
                    {post.content}
                </p>
            </section>

            {/* 반응 */}
            <section className="flex overflow-hidden rounded-full border bg-white shadow-sm">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-500 font-semibold hover:text-pink-500 hover:bg-pink-50">
                    <ThumbUpOutlinedIcon />
                    {post.likeCount}
                </button>
                <div className="w-px bg-gray-200" />
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-500 hover:text-black hover:bg-gray-100">
                    <ThumbDownOutlinedIcon />
                    {post.dislikeCount}
                </button>
            </section>


            {/* 댓글 */}
            <section className="space-y-4 pt-8">
                {/* 댓글 입력 */}
                <div className="flex gap-2">
                    <input
                        placeholder="댓글을 입력하세요"
                        className="flex-1 rounded-lg border px-3 py-3 text-sm"
                    />
                    <button className="rounded-lg bg-pink-500 px-4 py-1 text-sm text-white">
                        등록
                    </button>
                </div>

                <div className="flex items-center gap-2 font-semibold">
                    <ChatBubbleOutlineIcon fontSize='small' />
                    댓글 3
                </div>

                {/* 댓글 리스트 */}
                <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-lg border px-4 py-3 text-sm"
                        >
                            <div className="flex justify-between text-xs text-gray-500">
                                <div className='flex items-center gap-1'>
                                    <span className="font-medium text-gray-900">팬덤_러버</span>

                                    <span className="rounded-full bg-black px-2 py-0.5 text-[11px] text-white">
                                        IVE
                                    </span>
                                </div>
                                <span>방금 전</span>
                            </div>
                            <p className="mt-1 text-gray-700">
                                공연 진짜 좋았어요 👍
                            </p>
                        </div>
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
                            console.log({
                                postId,
                                reportReason,
                                reportDetail,
                            })
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
