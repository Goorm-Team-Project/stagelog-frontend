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

  useEffect(() => {
    // 페이지가 로드될 때 수행할 작업
    ConcertService.getConcertList(
      { page: 1, size: 8 }
    ).then((response) => {
      setConcerts(response.data.data.events);
    });

    PostService.getPostList(
      {
        category: '전체',
        search: '',
        sort: 'like',
        page: 1,
        size: 4
      }
    )
      .then((res) => {
        const responseData = res.data.data
        setPosts(responseData.posts)
      })
      .catch((error) => {
        console.error('Error fetching posts:', error)
      })

      ConcertService.getConcertList(
      { sort:'favorite', page: 1, size: 5 }
    ).then((response) => {
      setUpcomingConcerts(response.data.data.events);
    });
  }, [])

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
