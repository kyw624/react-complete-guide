import { useState } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInValid = !enteredNameIsValid && enteredNameTouched;

  const regExp = new RegExp(
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    'gi'
  );
  const enteredEmailIsValid = regExp.test(enteredEmail.trim());
  const emailInputIsInValid = !enteredEmailIsValid && enteredEmailTouched;

  // Form 전체 유효성 검사
  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
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

  const handleEmailInputChange = (e) => {
    setEnteredEmail(e.target.value);
  };

  // 인풋이 포커스를 잃은 경우
  const handleInputBlur = (target, e) => {
    if (target === 'name') {
      setEnteredNameTouched(true);
      return;
    }

    if (target === 'email') {
      setEnteredEmailTouched(true);
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    // 입력값 초기화에는 state 활용
    setEnteredName('');
    setEnteredEmail('');

    // 올바른 값 제출 시 에러로 인한 상태 초기화
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputIsInValid
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = emailInputIsInValid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={handleSubmit}>
      {/* Name Input */}
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={handleNameInputChange}
          onBlur={handleInputBlur.bind(null, 'name')}
          value={enteredName}
        />
        {nameInputIsInValid && (
          <p className='error-text'>Name must not be empty.</p>
        )}
      </div>

      {/* Email Input */}
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input
          type='text'
          id='email'
          onChange={handleEmailInputChange}
          onBlur={handleInputBlur.bind(null, 'email')}
          value={enteredEmail}
        />
        {emailInputIsInValid && (
          <p className='error-text'>Email must not be empty.</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
