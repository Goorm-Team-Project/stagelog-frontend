import { useNavigate } from "react-router-dom";
import ConcertCard from "@/components/ConcertCard";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovingIcon from '@mui/icons-material/Moving';
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import PostCard from "@/components/PostCard";
import UpcomingConcertItem from "@/components/UpcomingConcertItem";

const concerts = [ // 콘서트 데이터 예시
  {
    id: 1,
    imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
    artist: 'BTS',
    title: '2025 WORLD TOUR - SEOUL',
    startDate: '2025-01-15',
    endDate: '2025-01-17',
    location: '올림픽 체조경기장',
    liked: true,
    likeCount: 12453,
  },
  {
    id: 2,
    imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
    artist: 'BLACKPINK',
    title: 'BORN PINK ENCORE CONCERT',
    startDate: '2025-02-10',
    location: '고척스카이돔',
    liked: false,
    likeCount: 9821,
  },
  {
    id: 3,
    imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
    artist: 'NewJeans',
    title: 'GET UP CONCERT',
    startDate: '2025-03-22',
    endDate: '2025-03-23',
    location: 'KSPO DOME',
    liked: true,
    likeCount: 8234,
  },
  {
    id: 4,
    imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
    artist: 'SEVENTEEN',
    title: 'FOLLOW AGAIN TOUR',
    startDate: '2025-04-05',
    endDate: '2025-04-07',
    location: '잠실 올림픽 주경기장',
    liked: false,
    likeCount: 7754,
  },
  {
    id: 5,
    imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
    artist: 'BTS',
    title: '2025 WORLD TOUR - SEOUL',
    startDate: '2025-01-15',
    endDate: '2025-01-17',
    location: '올림픽 체조경기장',
    liked: true,
    likeCount: 12453,
  },
  {
    id: 6,
    imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
    artist: 'BLACKPINK',
    title: 'BORN PINK ENCORE CONCERT',
    startDate: '2025-02-10',
    location: '고척스카이돔',
    liked: false,
    likeCount: 9821,
  },
  {
    id: 7,
    imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
    artist: 'NewJeans',
    title: 'GET UP CONCERT',
    startDate: '2025-03-22',
    endDate: '2025-03-23',
    location: 'KSPO DOME',
    liked: true,
    likeCount: 8234,
  },
  {
    id: 8,
    imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
    artist: 'SEVENTEEN',
    title: 'FOLLOW AGAIN TOUR',
    startDate: '2025-04-05',
    endDate: '2025-04-07',
    location: '잠실 올림픽 주경기장',
    liked: false,
    likeCount: 7754,
  },
]

const posts = [ // 커뮤니티 글 데이터 예시
  {
    id: 1,
    authorName: '팬덤 러버',
    createdAtLabel: '2025-01-01 18:00',
    title: 'BTS 잠실 콘서트 후기 – 진짜 이건 전설이었다',
    excerpt:
      '어제 잠실에서 열린 BTS 콘서트 다녀왔습니다. 공연 시작 전부터 현장 분위기가 장난 아니었고, 응원봉 물결이 진짜 장관이었어요. 오프닝 곡부터 엔딩까지 단 한 순간도 집중이 흐트러지지 않았고, 라이브 실력도 정말 말이 안 될 정도로 안정적이었습니다. 특히 중반부 유닛 무대는 영상으로만 보던 것보다 훨씬 압도적이었고, 마지막 멘트에서 멤버들 진심이 느껴져서 눈물 참기 힘들었네요. 여운이 아직도 남아 있어서 오늘 하루 종일 플레이리스트를 못 끄고 있습니다.',
    likeCount: 128,
    commentCount: 26,
    userBadgeName: 'BTS',
    categoryLabel: '후기',
  },
  {
    id: 2,
    authorName: '아미',
    createdAtLabel: '2025-01-02 10:40',
    title: 'BTS 콘서트 좌석 정보 공유 (1층 vs 3층)',
    excerpt:
      '이번 BTS 콘서트 다녀오면서 좌석 관련 질문이 많을 것 같아 정리해봅니다. 저는 3층 측면 좌석이었는데, 생각보다 시야가 괜찮았어요. 무대 전체 구성이 한눈에 들어와서 퍼포먼스 감상하기 좋았고, 스크린도 잘 보였습니다. 다만 멤버들 표정 위주로 보고 싶으신 분들은 1층이 훨씬 만족도가 높을 것 같아요. 음향은 층수보다는 위치 영향이 더 큰 느낌이었고, 중앙 쪽이 확실히 안정적이었습니다.',
    likeCount: 96,
    commentCount: 18,
    userBadgeName: 'BTS',
    categoryLabel: '정보',
  },
  {
    id: 3,
    authorName: '콘서트초보',
    createdAtLabel: '2025-01-02 22:15',
    title: 'BTS 콘서트 첫 관람인데 준비물 뭐가 필요할까요?',
    excerpt:
      '이번에 처음으로 BTS 콘서트를 가게 됐는데 너무 설레면서도 긴장돼요. 응원봉은 필수라는 건 알고 있는데, 그 외에 꼭 챙기면 좋은 준비물이 있을까요? 장시간 서 있거나 이동이 많다고 들었는데 편한 신발이 중요한지도 궁금하고, 굿즈 구매 타이밍이나 입장 시간도 잘 모르겠어요. 다녀오신 분들 경험 공유해주시면 정말 감사하겠습니다!',
    likeCount: 73,
    commentCount: 41,
    userBadgeName: 'BTS',
    categoryLabel: '질문',
  },
  {
    id: 4,
    authorName: '아미_서울',
    createdAtLabel: '2025-01-03 14:30',
    title: 'BTS 콘서트 세트리스트 정리 + 개인적인 감상',
    excerpt:
      '이번 BTS 콘서트 세트리스트가 정말 완벽했다고 느꼈어요. 초반에는 에너지 넘치는 곡들로 분위기를 끌어올리고, 중반부에는 감성적인 곡들로 흐름을 자연스럽게 가져가더라고요. 개인적으로는 중후반 발라드 구간에서 조명이랑 연출이 너무 잘 어울려서 기억에 오래 남을 것 같습니다. 앵콜 무대까지 포함해서 전체적인 구성 완성도가 굉장히 높았어요.',
    likeCount: 142,
    commentCount: 33,
    userBadgeName: 'BTS',
    categoryLabel: '후기',
  },
]

const upcomingConcerts = [
  {
    concertId: 1,
    imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
    artist: 'BLACKPINK',
    title: 'BORN PINK ENCORE CONCERT',
    dateLabel: '2025년 2월 10일 · 서울',
  },
  {
    concertId: 2,
    imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
    artist: 'NewJeans',
    title: 'GET UP CONCERT',
    dateLabel: '2025년 3월 22일 ~ 23일',
  },
  {
    concertId: 3,
    imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
    artist: 'Seventeen',
    title: 'FOLLOW AGAIN TOUR',
    dateLabel: '2025년 4월 5일 ~ 7일',
  },
  {
    concertId: 4,
    imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
    artist: 'Stray Kids',
    title: 'STRAY KIDS CONCERT',
    dateLabel: '2025년 5월 3일',
  },
  {
    concertId: 5,
    imageUrl: 'https://timeline.coldplay.com/livetransmissions/27726_med_20160616184153.jpg',
    artist: 'ITZY',
    title: 'CHECKMATE WORLD TOUR',
    dateLabel: '2025년 6월 10일 ~ 11일',
  },
]



export default function HomePage() {
  const navigate = useNavigate()
  return (
    <main className="mx-auto max-w-layout flex flex-col gap-24">
      {/* 진행 중인 공연 섹션 */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <WhatshotIcon sx={{ color: "#F6339A" }} />
            진행 중인 공연
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
            <ConcertCard key={concert.id} {...concert} />
          ))}
        </div>
      </div>

      {/* 커뮤니티 인기글 섹션 */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <MovingIcon sx={{ color: "#F6339A" }} />
          커뮤니티 인기글
        </h2>

        <div className="grid grid-cols-1 justify-items-center gap-4">
          {Array.from({ length: 4 }, (_, index) => (
            <PostCard key={index} {...posts[index]} />
          ))}
        </div>
      </div>
      
      {/* 다가오는 공연 일정 섹션 */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <EventAvailableIcon sx={{ color: "#F6339A" }} />
          다가오는 공연 일정
        </h2>
        <div className="rounded-xl border bg-white p-4 border border-gray-100 shadow-md">
          <ul className="space-y-3">
            {upcomingConcerts.map((concert) => (
              <UpcomingConcertItem key={concert.concertId} {...concert} />
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
