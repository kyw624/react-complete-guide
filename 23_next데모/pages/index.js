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

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// 빌드 프로세스 중 실행되는 정적 생성 코드로 데이터 가져오기를 기다린 뒤 함께 렌더링됨.
export async function getStaticProps() {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

// // 서버가 배포된 후 요청이 들어올 때마다 서버에서 페이지를 생성
// // context 매개변수를 통해 요청, 응답 객체에 접근 가능
// // 따라서 현재 프로젝트에서는 적합하지 않음. (예시용)
// export async function getServerSideProps(context) {
//   const req = context.req; // 요청 객체
//   const res = context.res; // 응답 객체

//   // 데이터 fetch
//   // ...

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
