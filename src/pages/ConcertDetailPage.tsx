export default function ConcertDetailPage() {
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
        2025 WORLD TOUR - SEOUL
      </h1>

      {/* 태그 */}
      <div className="flex gap-2 pb-4 mb-8 border-b border-gray-200">
        <span className="px-2 py-0.5 text-sm rounded-full bg-pink-100 text-pink-600">
          BTS
        </span>
      </div>

      {/* 본문 */}
      <section className="grid grid-cols-[280px_1fr] gap-10">
        {/* 포스터 */}
        <div>
          <img
            src="https://kopis.or.kr/_next/image?url=%2Fupload%2FpfmPoster%2FPF_PF282682_260106_130907.gif&w=256&q=75"
            alt="concert poster"
            className="w-full rounded-lg object-cover"
          />
          <p className="mt-2 text-sm text-gray-400 text-center">
            최종 수정: 2025.12.13
          </p>
        </div>

        {/* 공연 정보 */}
        <div>
          <dl className="grid grid-cols-[120px_1fr] gap-y-8 text-md">
            <dt className="text-gray-500">공연명</dt>
            <dd>2025 WORLD TOUR - SEOUL</dd>

            <dt className="text-gray-500">공연기간</dt>
            <dd>2026.02.03(월) ~ 2026.02.08(토)</dd>

            <dt className="text-gray-500">공연시간</dt>
            <dd>2026.02.03(월) ~ 2026.02.08(토)</dd>

            <dt className="text-gray-500">관람연령</dt>
            <dd>만 7세 이상</dd>

            <dt className="text-gray-500">관람시간</dt>
            <dd>약 170분</dd>

            <dt className="text-gray-500">아티스트</dt>
            <dd>BTS</dd>

            <dt className="text-gray-500">티켓가격</dt>
            <dd className="leading-6">
              사운드체크 VIP 스탠딩 187,000원<br />
              VIP 스탠딩 165,000원<br />
              SR 154,000원
            </dd>

            <dt className="text-gray-500">장소</dt>
            <dd>잠실종합운동장</dd>

            <dt className="text-gray-500">제작사</dt>
            <dd>(주)하이브</dd>
          </dl>

          {/* 예매 링크 */}
          <div className="mt-10">
            <button className="w-full rounded-full bg-pink-500 py-3 text-white font-semibold hover:bg-pink-600 transition">
              예매링크 바로가기
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
