import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
import { user } from '../db';

const { username, password } = user;

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// 빌드 프로세스 중 실행되는 정적 생성 코드로 데이터 가져오기를 기다린 뒤 함께 렌더링됨.
export async function getStaticProps() {
  // 서버에서만 실행되어 번들에 포함되지 않고 보안에도 유용하다.
  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${password}@cluster0.sjwr7sg.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray(); // 해당 컬렉션의 모든 문서 찾아 배열로 받음

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
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
