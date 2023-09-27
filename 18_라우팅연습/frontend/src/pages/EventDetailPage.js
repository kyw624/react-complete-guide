import { useParams } from 'react-router-dom';

function EventDetailPage() {
  const params = useParams();

  return (
    <p>
      <h1>Event detail</h1>
      Current event: {params.someId}
    </p>
  );
}

export default EventDetailPage;
