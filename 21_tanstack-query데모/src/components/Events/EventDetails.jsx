import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

/**
 * [실습 요구사항]
 * 1. 세부사항 데이터 불러와서 표시
 * 2. 삭제 기능 구현
 */

export default function EventDetails() {
  const id = useParams().id;
  const navigate = useNavigate();

  const {
    data,
    isPending: isQueryPending,
    isError: isQueryError,
    error: queryError,
  } = useQuery({
    queryKey: ['event', { id }],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });

  const { mutate, isPending: isMutationPending } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none', // 기존 쿼리 자동 트리거 방지
      });
      navigate('/events');
    },
  });

  function handleDelete() {
    mutate({ id });
  }

  let content;

  if (isQueryPending) {
    content = (
      <div id='event-details-content'>
        <LoadingIndicator />
      </div>
    );
  }

  if (isQueryError) {
    content = (
      <div id='event-details-content'>
        <ErrorBlock
          title='An error occurred'
          message={queryError.info?.message}
        />
      </div>
    );
  }

  if (data) {
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleDelete}>
              {isMutationPending ? 'Submitting...' : 'Delete'}
            </button>
            <Link to='edit'>Edit</Link>
          </nav>
        </header>
        <div id='event-details-content'>
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id='event-details-info'>
            <div>
              <p id='event-details-location'>{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {data.date} @ {data.time}
              </time>
            </div>
            <p id='event-details-description'>{data.description}</p>
          </div>
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
      <article id='event-details'>{content}</article>
    </>
  );
}
