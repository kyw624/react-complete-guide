// import
const redux = require('redux');

const initialCounterState = {
  counter: 0,
};

// 리듀서
const counterReducer = (state = initialCounterState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        counter: state.counter + 1,
      };

    case 'DECREMENT':
      return {
        counter: state.counter - 1,
      };

    default:
      return state;
  }
};

// 저장소
const store = redux.createStore(counterReducer);

// 구독
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};
store.subscribe(counterSubscriber);

// 액션 디스패치
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
