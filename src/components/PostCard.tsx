import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// 시계 아이콘
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";

type PostCardProps = {
    post_id: number;
    event?: {
        event_id: number;
        title: string;
    }
    user_id: number;
    nickname: string;
    created_at: string;
    title: string;
    content: string;
    like: number;
    dislike: number;
    views: number;
    category?: string;
};

export default function PostCard({
    post_id,
    event,
    user_id,
    nickname,
    created_at,
    title,
    content,
    like,
    dislike,
    views,
    category,
}: PostCardProps) {
    const navigate = useNavigate();

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

    return (
        <button
            type="button"
            onClick={() => navigate(`/posts/${post_id}`)}
            className="w-full text-left border border-gray-100 rounded-xl px-8 py-6 overflow-hidden bg-white shadow-md hover:shadow-lg transition"
        >
            {/*행사 정보 */}
            {event && (
                <div className="text-xl text-black mb-2 pb-1 border-b border-gray-100">{`${event.title}`}</div>
            )}

            {/* 상단 메타 */}
            <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">{nickname}</span>

                <span className="ml-2 text-gray-500">
                    <AccessTimeIcon sx={{ fontSize: 18 }} />
                </span>
                <span className="text-sm text-gray-500">{formatKoreanDate(created_at)}</span>
            </div>

            {/* 제목 */}
            <div className="flex items-center gap-2 mt-2 line-clamp-1 text-[18px] font-semibold text-gray-900">
                {title}
                {category && (
                    <span className="rounded-full bg-pink-100 px-2.5 py-1 text-[12px] font-semibold text-pink-600">
                        {category}
                    </span>
                )}
            </div>

            {/* 본문 요약 */}
            <p className="mt-2 text-sm leading-6 text-gray-500 overflow-hidden text-ellipsis"
                style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
            >
                {content}
            </p>

            {/* 하단 액션 */}
            <div className="mt-3 flex items-center gap-6 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                    <ThumbUpOutlinedIcon sx={{ fontSize: 18 }} />
                    {like}
                </span>

                <span className="inline-flex items-center gap-1.5">
                    <ThumbDownOutlinedIcon sx={{ fontSize: 18 }} />
                    {dislike}
                </span>

                <span className="inline-flex items-center gap-1.5">
                    <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                    {views}
                </span>
            </div>
        </button>
    );
}
