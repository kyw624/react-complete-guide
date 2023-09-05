import { useReducer } from 'react';

const INPUT = 'INPUT';
const BLUR = 'BLUR';
const RESET = 'RESET';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case INPUT:
      return {
        ...state,
        value: action.payload,
      };

    case BLUR:
      return {
        ...state,
        isTouched: true,
      };

    case RESET:
      return initialInputState;

    default:
      return initialInputState;
  }
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const handleInputChange = (e) => {
    dispatch({ type: INPUT, payload: e.target.value });
  };

  const handleInputBlur = (e) => {
    dispatch({ type: BLUR });
  };

  const reset = () => {
    dispatch({ type: RESET });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    handleInputChange,
    handleInputBlur,
    reset,
  };
};

export default useInput;
