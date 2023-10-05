import { json, useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // }); // Response 객체 생성

    // json 형식의 데이터를 포함하는 Response 객체를 생성하는 함수.
    return json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    return response;
  }
}
