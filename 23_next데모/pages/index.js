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
  return <MeetupList meetups={DUMMY_MEETUPS} />;
}

export default HomePage;
