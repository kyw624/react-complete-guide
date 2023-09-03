import { useState } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInValid = !enteredNameIsValid && enteredNameTouched;

  // Form 전체 유효성 검사
  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  ////
  // Form 전체 유효성 검사를 아래처럼 구현해도되지만
  // 이 경우에는 useEffect를 사용하면 오히려 손해다.
  //
  // const [formIsValid, setFormIsValid] = useState(false);
  // useEffect(() => {
  //   // 모든 유효성 체크
  //   if (enteredNameIsValid) {
  //     setFormIsValid(true);
  //   } else {
  //     setFormIsValid(false);
  //   }
  // }, [enteredNameIsValid]);

  const handleNameInputChange = (e) => {
    setEnteredName(e.target.value);
  };

  // 인풋이 포커스를 잃은 경우
  const handleNameInputBlur = (e) => {
    setEnteredNameTouched(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    setEnteredName(''); // 입력값 초기화에는 state 활용
    setEnteredNameTouched(false); // 올바른 값 제출 시 에러로 인한 상태 초기화
  };

  const nameInputClasses = nameInputIsInValid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={handleSubmit}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
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
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
