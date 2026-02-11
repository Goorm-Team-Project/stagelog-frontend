// 1. 403 Forbidden - 이미 차단된 사용자용
export const BannedPage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">접속 제한 안내</h1>
      <p>운영 정책 위반 또는 비정상적인 접근으로 인해 해당 IP에서의 접속이 영구적으로 제한되었습니다.<br />문의사항이 있으시면 고객센터로 연락 바랍니다.</p>
    </>
  );
};

// 2. 429 Too Many Requests - 과도한 요청 사용자용
export const RateLimitPage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">일시적 접속 차단</h1>
      <p>짧은 시간 동안 너무 많은 요청이 발생하였습니다.<br />보안을 위해 잠시 접속이 제한되었으니,<br />잠시 후 다시 시도해 주세요.</p>
    </>
  );
};