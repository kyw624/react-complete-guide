const redux = require('redux');

export const INCREMENT = 'INCREMENT';
export const INCREASE = 'INCREASE';
export const DECREMENT = 'DECREMENT';
export const TOGGLE = 'TOGGLE';

const initailState = {
  counter: 0,
  showCounter: true,
};

const counterReducer = (state = initailState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };

    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.payload,
      };

    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };

    case TOGGLE:
      return {
        ...state,
        showCounter: !state.showCounter,
      };

    default:
      return state;
  }
};

const store = redux.createStore(counterReducer);

export default store;
