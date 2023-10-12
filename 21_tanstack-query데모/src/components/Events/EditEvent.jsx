import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const id = useParams().id;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { id }],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newEvent = data.event;

      await queryClient.cancelQueries({ queryKey: ['events', { id }] });

      const previousEvent = queryClient.getQueryData(['events', { id }]);

      queryClient.setQueryData(['events', { id }], newEvent);

      return { previousEvent };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', { id }], context.previousEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['events', { id }]);
    },
  });

  function handleSubmit(formData) {
    mutate({ id, event: formData });
    navigate('../'); // onSuccess 대신 의도적으로 이곳에 뒤로가기 추가
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isPending) {
    content = (
      <div className='center'>
        <LoadingIndicator />
      </div>
    );
  }

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
        <Link to='../' className='button-text'>
          Cancel
        </Link>
        <button type='submit' className='button'>
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
