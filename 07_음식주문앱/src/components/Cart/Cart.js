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

import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import Checkout from '../Checkout/Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출중
  const [didSubmit, setDidSubmit] = useState(false); // 제출 유무

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const handleCartItemAdd = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const handleCartItemRemove = (id) => {
    cartCtx.removeItem(id);
  };

  const handleOrder = () => {
    setIsCheckout(true);
  };

  const handleSubmitOrder = async (userData) => {
    setIsSubmitting(true);

    const now = new Date();
    const hh = now.getHours();
    const mm = now.getMinutes();
    const ss = now.getSeconds();

    const orderDate = now.toISOString().split('T')[0];
    const orderTime = `${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${
      ss < 10 ? `0${ss}` : ss
    }`;

    const newOrderInfo = {
      ...userData,
      orderTime,
      orderDate,
    };

    const response = await fetch(
      'https://react-food-order-app-4c35a-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: newOrderInfo,
          orderedItems: cartCtx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);

    // 완료된 주문 리셋
    cartCtx.resetItem();
  };

  // // 제출 시 영수증 정보
  // const handleSubmitButtonClick = (checkoutInfo) => {
  //   const [name, phoneNumber] = checkoutInfo;

  //   const receiptItems = cartCtx.items.map((item) => {
  //     return `${item.name} | x${item.amount} | $${item.price * item.amount}`;
  //   });

  //   // 임시 영수증
  //   // 요구사항 모두 만족 후 영수증 모달 구현 예정
  //   console.log('------------------------');
  //   console.log(receiptItems.join('\n'));
  //   console.log('총액:', `$${cartCtx.totalAmount.toFixed(2)}`);
  //   console.log('------------------------');
  //   console.log('결제자:', name);
  //   console.log('전화번호:', phoneNumber);

  //   // 완료된 주문 리셋
  //   cartCtx.resetItem();

  //   // 장바구니 모달 닫은 후 영수증 모달 띄우기
  //   props.onClose();
  // };

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

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={handleSubmitOrder} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
