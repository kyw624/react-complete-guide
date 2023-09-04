import { useState } from 'react';

const useInputPractice = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateValue(enteredValue);
  const hasError = !isValid && isTouched;

  const handleInputChange = (e) => {
    setEnteredValue(e.target.value);
  };

  const handleInputBlur = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid,
    hasError,
    handleInputChange,
    handleInputBlur,
    reset,
  };
};

export default useInputPractice;
