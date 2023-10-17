import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  function handleAddMeetup(enteredMeetupData) {
    console.log(enteredMeetupData);
  }

  return <NewMeetupForm onAddMeetup={handleAddMeetup} />;
}

export default NewMeetupPage;
