import { useEffect, useState } from 'react';

import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: '첫번째 모임',
    image:
      'https://content.skyscnr.com/m/1bf0d1856ed075b1/original/czech-republic-prague-gettyimages-503372055.jpg?resize=1800px:1800px&quality=100',
    address: '서울',
    description: '첫번째 모임입니다.',
  },
  {
    id: 'm2',
    title: '두번째 모임',
    image:
      'https://content.skyscnr.com/m/1bf0d1856ed075b1/original/czech-republic-prague-gettyimages-503372055.jpg?resize=1800px:1800px&quality=100',
    address: '서울',
    description: '두번째 모임입니다.',
  },
  {
    id: 'm3',
    title: '첫번째 모임',
    image:
      'https://content.skyscnr.com/m/1bf0d1856ed075b1/original/czech-republic-prague-gettyimages-503372055.jpg?resize=1800px:1800px&quality=100',
    address: '서울',
    description: '세번째 모임입니다.',
  },
];

function HomePage() {
  // 첫 렌더링 시 비어있는 상태에서 사전 렌더링 페이지 생성됨.
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  // 데이터를 가져온 뒤 두번째 렌더링이 일어나지만 사전 렌더링 된 페이지에는 해당 콘텐츠가 존재하지 않음.
  useEffect(() => {
    // HTTP 요청 코드
    // ...

    setLoadedMeetups(DUMMY_MEETUPS);
  }, [loadedMeetups]);

  return <MeetupList meetups={loadedMeetups} />;
}

export default HomePage;
