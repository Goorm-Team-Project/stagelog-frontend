import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// 시계 아이콘
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type PostCardProps = {
    authorName: string;
    createdAtLabel: string;
    title: string;
    excerpt: string;
    likeCount: number;
    commentCount: number;
    userBadgeName?: string;
    categoryLabel?: string;
    concertName?: string;
    onClick?: () => void;
};

export default function PostCard({
    authorName,
    createdAtLabel,
    title,
    excerpt,
    likeCount,
    commentCount,
    userBadgeName,
    categoryLabel = "후기",
    concertName,
    onClick,
}: PostCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full text-left border border-gray-100 rounded-xl px-8 py-6 overflow-hidden bg-white shadow-md hover:shadow-lg transition"
        >
            {/*행사 정보 */}
            {concertName && (
                <div className="text-xl text-black mb-2 pb-1 border-b border-gray-100">{`${concertName}`}</div>
            )}

            {/* 상단 메타 */}
            <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">{authorName}</span>

                {userBadgeName && (
                    <span className="rounded-full bg-gray-900 px-2.5 py-1 text-[11px] font-semibold text-white">
                        {userBadgeName}
                    </span>
                )}

                <span className="ml-2 text-gray-500">
                    <AccessTimeIcon sx={{ fontSize: 18 }} />
                </span>
                <span className="text-sm text-gray-500">{createdAtLabel}</span>
            </div>

            {/* 제목 */}
            <div className="flex items-center gap-2 mt-2 line-clamp-1 text-[18px] font-semibold text-gray-900">
                {title}
                {categoryLabel && (
                    <span className="rounded-full bg-pink-100 px-2.5 py-1 text-[12px] font-semibold text-pink-600">
                        {categoryLabel}
                    </span>
                )}
            </div>

            {/* 본문 요약 */}
            <p className="mt-2 text-sm leading-6 text-gray-500 overflow-hidden text-ellipsis"
                style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
            >
                {excerpt}
            </p>

            {/* 하단 액션 */}
            <div className="mt-3 flex items-center gap-6 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                    <ThumbUpOutlinedIcon sx={{ fontSize: 18 }} />
                    {likeCount}
                </span>

                <span className="inline-flex items-center gap-1.5">
                    <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
                    {commentCount}
                </span>
            </div>
        </button>
    );
}
