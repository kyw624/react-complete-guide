import { useReducer } from 'react';

const CHANGE_VALUE = 'CHANGE_VALUE';
const BLUR = 'BLUR';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        isTouched: !state.isTouched ? true : state.isTouched,
        value: action.payload,
      };

    case BLUR:
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};

const useInput = (validateValue, checked = true) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const isValid = validateValue(inputState.value);
  const hasError = !isValid && inputState.isTouched;

  const handleInputChange = (e) => {
    dispatch({ type: CHANGE_VALUE, payload: e.target.value });
  };

  const handleInputBlur = () => {
    dispatch({ type: BLUR });
  };

  return {
    value: inputState.value,
    isValid,
    hasError,
    handleInputChange,
    handleInputBlur,
  };
};

export default useInput;
