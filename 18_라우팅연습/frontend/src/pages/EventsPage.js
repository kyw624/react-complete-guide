import { Suspense } from 'react';
import { defer, json, useLoaderData, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData(); // defer가 반환하는 Promise

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // }); // Response 객체 생성

    // json 형식의 데이터를 포함하는 Response 객체를 생성하는 함수.
    return json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(), // Promise를 반환
  });
}
