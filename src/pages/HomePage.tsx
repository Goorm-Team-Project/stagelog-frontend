import { useNavigate } from "react-router-dom";
import ConcertCard from "@/components/ConcertCard";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovingIcon from '@mui/icons-material/Moving';
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import PostCard from "@/components/PostCard";
import UpcomingConcertItem from "@/components/UpcomingConcertItem";
import { useEffect, useState } from "react";
import { ConcertService } from "@/services/ConcertService";
import { PostService } from "@/services/PostService";

export default function HomePage() {
  const navigate = useNavigate()
  const [concerts, setConcerts] = useState<Array<{
    event_id: number
    poster: string
    title: string
    artist: string
    group_name: string | null
    start_date: string
    end_date?: string
    venue: string
    liked?: boolean
    favorite_count?: number
  }>>([])

  const [posts, setPosts] = useState(Array<{
    post_id: number;
    event: {
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
  }>())

  const [upcomingConcerts, setUpcomingConcerts] = useState<Array<{
    event_id: number
    poster: string
    artist: string
    title: string
    start_date: string
    end_date?: string
  }>>([])

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        // 2. 모든 요청을 병렬로 처리 (하나라도 실패하면 catch로 가거나, 개별 처리 가능)
        const [concertRes, postRes, upcomingRes] = await Promise.all([
          ConcertService.getConcertList({ page: 1, size: 8 }),
          PostService.getPostList({ category: '전체', sort: 'like', page: 1, size: 4 }),
          ConcertService.getConcertList({ sort: 'favorite', page: 1, size: 5 })
        ]);

        setConcerts(concertRes.data.data.events || []);
        setPosts(postRes.data.data.posts || []);
        setUpcomingConcerts(upcomingRes.data.data.events || []);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // 3. 에러 발생 시 전체 에러 화면
  if (isError) {
    return (
      <div className="py-40 text-center">
        <p className="text-xl text-gray-600">데이터를 불러오는 데 실패했습니다.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 4. 로딩 중일 때 (간단한 스피너 또는 메시지)
  if (isLoading) {
    return <div className="py-40 text-center text-gray-400">로딩 중...</div>;
  }

  return (
    <main className="mx-auto max-w-layout flex flex-col gap-24">
      {/* 진행 중인 공연 섹션 */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <EventAvailableIcon sx={{ color: "#F6339A" }} />
            최신 공연
          </h2>

          <button
            onClick={() => navigate('/concerts')}
            className="text-lg font-semibold text-pink-500 hover:underline">
            전체보기 →
          </button>
        </div>
        {/* 카드 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {concerts.map((concert) => (
            <ConcertCard key={concert.event_id} {...concert} />
          ))}
        </div>
      </div>

      {/* 커뮤니티 인기글 섹션 */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <MovingIcon sx={{ color: "#F6339A" }} />
          커뮤니티 인기글
        </h2>

        {posts.length === 0 ? (
          <div className="text-gray-500 text-center">게시글이 없습니다.</div>
        ) : (
          <div className="grid grid-cols-1 justify-items-center gap-4">
            {posts.slice(0, 4).map((post) => (
              <PostCard key={post.post_id} {...post} />
            ))}
          </div>
        )}
      </div>

      {/* 인기 공연 섹션 */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <WhatshotIcon sx={{ color: "#F6339A" }} />
          인기 공연
        </h2>
        <div className="rounded-xl border bg-white p-4 border border-gray-100 shadow-md">
          <ul className="space-y-3">
            {upcomingConcerts.map((concert) => (
              <UpcomingConcertItem key={concert.event_id} {...concert} />
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
