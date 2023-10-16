// 도메인/news/동적 매개변수
import { useRouter } from 'next/router';

function DetailPage() {
  const router = useRouter();
  const newsId = router.query.newsId; // URL에서 newsId 파일 경로의 동적 매개변수 값을 가져옴

  // 백엔드에 위에서 얻은 newsId에 해당하는 뉴스 항목 요청

  return (
    <>
      <h1>The Detail Page</h1>
      Content: {newsId}
    </>
  );
}

export default DetailPage;
