import { ConcertService } from "@/services/ConcertService"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

// "event_id": 1,
//         "kopis_id": "PF283191",
//         "title": "미스터트롯3 TOP7 콘서트 [춘천]",
//         "artist": "김용빈, 손용빈, 이정희, 김종범, 최재명, 남승민, 추혁진",
//         "start_date": "2026-03-07",
//         "end_date": "2026-03-07",
//         "venue": "강원대학교 백령아트센터 (강원대학교 백령아트센터)",
//         "area": null,
//         "age": "만 7세 이상",
//         "poster": "http://www.kopis.or.kr/upload/pfmPoster/PF_PF283191_260114_135845.gif",
//         "time": "토요일(13:00,18:00)",
//         "price": "SR석 154,000원, R석 143,000원, S석 121,000원",
//         "relate_url": "http://ticket.interpark.com/Ticket/Goods/GoodsInfo.asp?GoodsCode=26000310",
//         "host": "(주)밝은누리, TV조선",
//         "genre": "대중음악",
//         "update_date": "2026-01-14T15:00:04+00:00"

interface Concert {
  event_id: number;
  kopis_id: string;
  title: string;
  artist: string;
  start_date: string;
  end_date: string;
  venue: string;
  area: string | null;
  age: string;
  poster: string;
  time: string;
  price: string;
  relate_url: string;
  host: string;
  genre: string;
  update_date: string;
}

export default function ConcertDetailPage() {
  // url 파라미터에서 id 가져오기
  const { id } = useParams<{ id: string }>();
  const [concert, setConcert] = useState<Concert | null>(null);

  const formatKoreanDate = (dateString?: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const datePart = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const weekday = date.toLocaleDateString("ko-KR", {
    weekday: "short",
  });

  return `${datePart} (${weekday})`;
};

  useEffect(() => {
    if (!id) return

    ConcertService.getConcertDetail(Number(id)) // 예: event_id가 1인 콘서트 상세 정보 조회
      .then((res) => {
        setConcert(res.data.data);
      })
  }, [])

  return (
    <main className="mx-auto max-w-[1024px] px-6 py-10">
      {/* 뒤로가기 */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 flex items-center gap-2 text-md text-gray-600 hover:text-gray-900"
      >
        ← 이전 화면
      </button>

      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-2">
        {concert?.title}
      </h1>

      {/* 태그 */}
      <div className="flex gap-2 pb-4 mb-8 border-b border-gray-200">
        <span className="px-2 py-0.5 text-sm rounded-full bg-pink-100 text-pink-600">
          {concert?.artist}
        </span>
      </div>

      {/* 본문 */}
      <section className="grid grid-cols-[280px_1fr] gap-10">
        {/* 포스터 */}
        <div>
          <img
            src={concert?.poster}
            alt="concert poster"
            className="w-full rounded-lg object-cover"
          />
          <p className="mt-2 text-sm text-gray-400 text-center">
            {/* 년 월 일만 */}
            최종 수정: {formatKoreanDate(concert?.update_date)}
          </p>
        </div>

        {/* 공연 정보 */}
        <div>
          <dl className="grid grid-cols-[120px_1fr] gap-y-8 text-md">
            <dt className="text-gray-500">공연명</dt>
            <dd>{concert?.title}</dd>

            <dt className="text-gray-500">공연기간</dt>
            <dd>{formatKoreanDate(concert?.start_date)} ~ {formatKoreanDate(concert?.end_date)}</dd>

            <dt className="text-gray-500">공연시간</dt>
            <dd>{concert?.time}</dd>

            <dt className="text-gray-500">관람연령</dt>
            <dd>{concert?.age}</dd>

            <dt className="text-gray-500">아티스트</dt>
            <dd>{concert?.artist}</dd>

            <dt className="text-gray-500">티켓가격</dt>
            <dd className="leading-6">
              {concert?.price}
            </dd>

            <dt className="text-gray-500">장소</dt>
            <dd>{concert?.venue}</dd>

            <dt className="text-gray-500">제작사</dt>
            <dd>{concert?.host}</dd>
          </dl>

          {/* 예매 링크 */}
          <div className="mt-10">
            <button 
            onClick={() => window.open(concert?.relate_url, "_blank")}
            className="w-full rounded-full bg-pink-500 py-3 text-white font-semibold hover:bg-pink-600 transition">
              예매링크 바로가기
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
