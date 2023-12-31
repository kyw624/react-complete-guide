import useInputPractice from '../hooks/useInputPractice';

const regExp = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'i');

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => regExp.test(value.trim());

const BasicForm = (props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameInputHasError,
    handleInputChange: handleFirstNameInputChange,
    handleInputBlur: handleFirstNameInputBlur,
    reset: resetFirstNameInput,
  } = useInputPractice(isNotEmpty);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameInputHasError,
    handleInputChange: handleLastNameInputChange,
    handleInputBlur: handleLastNameInputBlur,
    reset: resetLastNameInput,
  } = useInputPractice(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    handleInputChange: handleEmailInputChange,
    handleInputBlur: handleEmailInputBlur,
    reset: resetEmailInput,
  } = useInputPractice(isEmail);

  const formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid;

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
            value={firstNameValue}
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
            value={lastNameValue}
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
          value={emailValue}
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
