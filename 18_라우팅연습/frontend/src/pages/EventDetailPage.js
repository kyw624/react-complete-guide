import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

function EventDetailPage() {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p stlye={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p stlye={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

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

export async function loader({ request, params }) {
  const id = params.someId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ request, params }) {
  const eventId = params.someId;

  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method, // EventItem.js의 useSubmit과 트리거
  });

  console.log(eventId, response);

  if (!response.ok) {
    throw json({ message: 'Could not delete event.' }, { status: 500 });
  }

  return redirect('/events');
}
