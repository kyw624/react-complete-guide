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

import React, { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const handleCartItemAdd = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const handleCartItemRemove = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={handleCartItemAdd.bind(null, item)}
          onRemove={handleCartItemRemove.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
