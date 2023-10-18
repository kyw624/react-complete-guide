import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';
import { user } from '../../db';

const { username, password } = user;

function MeetupDetails(props) {
  console.log(props.meetupData);
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${password}@cluster0.sjwr7sg.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  // 모든 문서에서 id 필드만 가져오기
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId; // context로 url에 접근

  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${password}@cluster0.sjwr7sg.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  // 하나의 문서를 찾는 메서드
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId), // DB에 저장된 객체 ID 형식으로 변환
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        title: selectedMeetup.title,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
