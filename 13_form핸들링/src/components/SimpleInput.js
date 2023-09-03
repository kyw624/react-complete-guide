import { useState, useRef, useEffect } from 'react';

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log('Name Input is valid!');
    }
  }, [enteredNameIsValid]);

  const handleNameInputChange = (e) => {
    setEnteredName(e.target.value);

    if (e.target.value.trim() !== '') {
      setEnteredNameIsValid(true);
    }
  };

  // 인풋이 포커스를 잃은 경우
  const handleNameInputBlur = (e) => {
    setEnteredNameTouched(true);

    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setEnteredNameTouched(true);

    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);

    console.log(enteredName);

    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    setEnteredName(''); // 입력값 초기화에는 state 활용
  };

  const nameInputIsInValid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = nameInputIsInValid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={handleSubmit}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameInputRef}
          type='text'
          id='name'
          onChange={handleNameInputChange}
          onBlur={handleNameInputBlur}
          value={enteredName}
        />
        {nameInputIsInValid && (
          <p className='error-text'>Name must not be empty.</p>
        )}
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
