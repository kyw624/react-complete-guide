import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails() {
  return (
    <MeetupDetail
      image='https://content.skyscnr.com/m/1bf0d1856ed075b1/original/czech-republic-prague-gettyimages-503372055.jpg?resize=1800px:1800px&quality=100'
      title='첫번째 모임'
      address='서울'
      description='첫번째 모임입니다.'
    />
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [{ params: { meetupId: 'm1' } }, { params: { meetupId: 'm2' } }],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId; // context로 url에 접근

  return {
    props: {
      meetupData: {
        // id: meetupId,
        // image:,
        // title:,
        // description:,
        // addres:,
      },
    },
  };
}

export default MeetupDetails;
