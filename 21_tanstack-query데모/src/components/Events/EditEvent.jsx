import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { state } = useNavigation(); // 데이터 전송 여부, 상태 확인
  const id = useParams().id;
  const submit = useSubmit();

  const { data, isError, error } = useQuery({
    queryKey: ['events', { id }],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
    staleTime: 10000, // staleTime 설정해 중복 요청 방지
  });

  // 리액트 라우터의 action 함수로 대체
  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event;

  //     await queryClient.cancelQueries({ queryKey: ['events', { id }] });

  //     const previousEvent = queryClient.getQueryData(['events', { id }]);

  //     queryClient.setQueryData(['events', { id }], newEvent);

  //     return { previousEvent };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(['events', { id }], context.previousEvent);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(['events', { id }]);
  //   },
  // });

  function handleSubmit(formData) {
    // mutate({ id, event: formData });
    // navigate('../'); // onSuccess 대신 의도적으로 이곳에 뒤로가기 추가

    submit(formData, { method: 'PUT' });
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  // 이 컴포넌트에서 기술적으로 로딩 인디케이터가 필요하지않아 제거
  // if (isPending) {
  //   content = (
  //     <div className='center'>
  //       <LoadingIndicator />
  //     </div>
  //   );
  // }

  // 리액트 라우터의 에러 핸들링 기능으로 대체 가능
  if (isError) {
    content = (
      <>
        <ErrorBlock
          title='Failed to load event'
          message={
            error.info?.message ||
            'Failed to load event, Please check your inputs and try again later.'
          }
        />
        <div className='form-actions'>
          <Link to='../' className='button'>
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === 'submitting' ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to='../' className='button-text'>
              Cancel
            </Link>
            <button type='submit' className='button'>
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

// 리액트 라우터의 loader, action과 리액트 쿼리를 함께 사용하는 예제

// 1. 컴포넌트 호출 전 loader 함수에서 쿼리 캐싱
// 2. 데이터를 모두 불러오면 컴포넌트 렌더링
export function loader({ params }) {
  const id = params.id;

  // userQuery와 동일한 구성
  return queryClient.fetchQuery({
    queryKey: ['events', { id }],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });
}

// 1. 이 페이지의 양식이 제출될 때 트리거
// 2. 이곳에서 무효화하면 낙관적 업데이트를 더 이상 실행하지않음
export async function action({ request, params }) {
  const id = params.id;
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);

  await updateEvent({ id, event: updatedEventData });
  await queryClient.invalidateQueries(['events']);

  return redirect('../');
}
