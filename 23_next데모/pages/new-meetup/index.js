import Head from 'next/head';
import { useRouter } from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  const router = useRouter();

  async function handleAddMeetup(enteredMeetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);

    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name='description'
          content='모임을 추가하고 네트워킹 활동을 창출해보세요!'
        />
      </Head>
      <NewMeetupForm onAddMeetup={handleAddMeetup} />
    </>
  );
}

export default NewMeetupPage;
