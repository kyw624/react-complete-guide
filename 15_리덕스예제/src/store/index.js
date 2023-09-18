const redux = require('redux');

const initailState = {
  counter: 0,
};

const counterReducer = (state = initailState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { counter: state.counter + 1 };

    case 'DECREMENT':
      return { counter: state.counter - 1 };

    default:
      return state;
  }
};

const store = redux.createStore(counterReducer);

export default store;
