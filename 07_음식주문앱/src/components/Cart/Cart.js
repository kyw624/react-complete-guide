// Cart 컴포넌트
//   - Modal + Backdrop + Card
//   1. 장바구니 항목 렌더링
//     - ul, li
//     - itemlist state (prop chains 4 이상 => Context 사용?)
//     - 이 state는 장바구니 버튼 뱃지에도 개수 표시
//   2. 항목별 수량 표시
//     - 개수 증감 버튼
//   3. 장바구니 나가기, 주문하기 버튼

// MealItemForm.js
//   1. Add 버튼 클릭 => input value만큼 Cart에 아이템 추가

import React from 'react';

import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {
  const cartItems = (
    <ul className={classes['cart-items']}>
      {[{ id: 'c1', name: 'Sushi', amount: 2, price: 12.99 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onClose ={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
