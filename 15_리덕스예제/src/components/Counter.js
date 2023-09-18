import { useSelector, useDispatch } from 'react-redux';

import classes from './Counter.module.css';
import { INCREMENT, INCREASE, DECREMENT, TOGGLE } from '../store';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);

  const handleIncrement = () => {
    dispatch({ type: INCREMENT });
  };

  const handleIncrease = () => {
    dispatch({ type: INCREASE, payload: 5 });
  };

  const handleDecrement = () => {
    dispatch({ type: DECREMENT });
  };

  const handleToggleCounter = () => {
    dispatch({ type: TOGGLE });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}{' '}
      <div>
        <button type='button' onClick={handleIncrement}>
          Increment
        </button>
        <button type='button' onClick={handleIncrease}>
          Increse by 5
        </button>
        <button type='button' onClick={handleDecrement}>
          Decrement
        </button>
      </div>
      <button onClick={handleToggleCounter}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// import { Component } from 'react';
// import {connect} from 'react-redux';

// class Counter extends Component {
//   handleIncrement() {
//     this.props.increment();
//   }

//   handleDecrement() {
//     this.props.decrement();
//   }

//   handleToggleCounter() {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button type='button' onClick={this.handleIncrement.bind(this)}>
//             Increment
//           </button>
//           <button type='button' onClick={this.handleDecrement.bind(this)}>
//             Decrement
//           </button>
//         </div>
//         <button onClick={this.handleToggleCounter}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// // 상태를 받는 함수
// const mapStateToProps = (state) => {
//   return {
//     counter: state.counter, // key가 prop name
//   };
// };

// // 액션을 받는 함수
// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: 'INCREMENT' }),
//     decrement: () => dispatch({ type: 'DECREMENT' }),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
