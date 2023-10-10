import { Link, Outlet, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchEvent } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

/**
 * [실습 요구사항]
 * 1. 세부사항 데이터 불러와서 표시
 * 2. 삭제 기능 구현
 */

export default function EventDetails() {
  const id = useParams().id;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['event', { id }],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });

  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title='An error occurred' message={error.info?.message} />
    );
  }

  if (data) {
    content = (
      <>
        <img src={`http://localhost:3000/${data.image}`} alt={data.image} />
        <div id='event-details-info'>
          <div>
            <p id='event-details-location'>{data.location}</p>
            <time dateTime={`Todo-DateT$Todo-Time`}>
              {data.date} @ {data.time}
            </time>
          </div>
          <p id='event-details-description'>{data.description}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to='/events' className='nav-item'>
          View all Events
        </Link>
      </Header>
      <article id='event-details'>
        <header>
          <h1>EVENT TITLE</h1>
          <nav>
            <button>Delete</button>
            <Link to='edit'>Edit</Link>
          </nav>
        </header>
        <div id='event-details-content'>{content}</div>
      </article>
    </>
  );
}
