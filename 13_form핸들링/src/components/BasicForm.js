import useInputPractice from '../hooks/useInputPractice';

const regExp = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'gi');

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameInputHasError,
    handleInputChange: handleFirstNameInputChange,
    handleInputBlur: handleFirstNameInputBlur,
    reset: resetFirstNameInput,
  } = useInputPractice((value) => value.trim() !== '');

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameInputHasError,
    handleInputChange: handleLastNameInputChange,
    handleInputBlur: handleLastNameInputBlur,
    reset: resetLastNameInput,
  } = useInputPractice((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    handleInputChange: handleEmailInputChange,
    handleInputBlur: handleEmailInputBlur,
    reset: resetEmailInput,
  } = useInputPractice((value) => regExp.test(value.trim()));

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const firstNameInputClasses = firstNameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const lastNameInputClasses = lastNameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={handleSubmit}>
      <div className='control-group'>
        {/* First */}
        <div className={firstNameInputClasses}>
          <label htmlFor='first-name'>First Name</label>
          <input
            type='text'
            id='first-name'
            value={enteredFirstName}
            onChange={handleFirstNameInputChange}
            onBlur={handleFirstNameInputBlur}
          />
          {firstNameInputHasError && (
            <p className='error-text'>다시 입력해주세요.</p>
          )}
        </div>

        {/* Last */}
        <div className={lastNameInputClasses}>
          <label htmlFor='last-name'>Last Name</label>
          <input
            type='text'
            id='last-name'
            value={enteredLastName}
            onChange={handleLastNameInputChange}
            onBlur={handleLastNameInputBlur}
          />
          {lastNameInputHasError && (
            <p className='error-text'>다시 입력해주세요.</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className={emailInputClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='text'
          id='email'
          value={enteredEmail}
          onChange={handleEmailInputChange}
          onBlur={handleEmailInputBlur}
        />
        {emailInputHasError && <p className='error-text'>다시 입력해주세요.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
