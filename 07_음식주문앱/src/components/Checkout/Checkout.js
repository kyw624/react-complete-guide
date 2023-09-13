import React, { useContext, useState } from 'react';

import useInput from '../hooks/useInput';
import CartContext from '../../store/cart-context';
import classes from './Checkout.module.css';

const isEmpty = (value) => value !== '';
const regExp = new RegExp(/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/);
const isPhoneNumber = (value) => regExp.test(value);

const Checkout = (props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    handleInputChange: nameInputChange,
    handleInputBlur: nameInputBlur,
  } = useInput(isEmpty);

  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    handleInputChange: phoneInputChange,
    handleInputBlur: phoneInputBlur,
  } = useInput(isPhoneNumber);

  // 체크박스 핸들링
  const [isSigned, setIsSigned] = useState(false);

  const handleCheckInput = (e) => {
    setIsSigned((prevState) => !prevState);
    console.log(isSigned);
  };

  let formIsValid = false;

  if (nameIsValid && phoneIsValid && isSigned) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const cartCtx = useContext(CartContext);

  const saveOrder = async (orderInfo) => {
    const now = new Date();
    const hh = now.getHours();
    const mm = now.getMinutes();
    const ss = now.getSeconds();

    const orderDate = now.toISOString().split('T')[0];
    const orderTime = `${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${
      ss < 10 ? `0${ss}` : ss
    }`;

    const newOrderInfo = {
      ...orderInfo,
      orderTime,
      orderDate,
    };

    try {
      await fetch(
        'https://react-food-order-app-4c35a-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newOrderInfo),
        }
      );
    } catch (error) {
      console.log('Save order Error!');
    }
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onSubmit([nameValue, phoneValue]); // 영수증 작성을 위한 정보

    // 주문서 데이터베이스에 POST
    const orderInfo = {
      items: cartCtx.items,
      totalAmount: +cartCtx.totalAmount.toFixed(2),
      name: nameValue,
      phoneNumber: phoneValue,
    };

    saveOrder(orderInfo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.order}>📄Order Sheet</div>
      {/* Name: string */}
      <div className={classes.input}>
        <label htmlFor='name'>Name</label>
        <input
          className={nameHasError ? classes.invalid : ''}
          type='text'
          id='name'
          onChange={nameInputChange}
          onBlur={nameInputBlur}
          value={nameValue}
        />
        {nameHasError && <p>이름을 입력해주세요.</p>}
      </div>

      {/* Phone number: number */}
      <div className={classes.input}>
        <label htmlFor='phone'>Tel</label>
        <input
          className={phoneHasError ? classes.invalid : ''}
          type='text'
          id='phone'
          onChange={phoneInputChange}
          onBlur={phoneInputBlur}
          value={phoneValue}
        />
        {phoneHasError && (
          <p>전화번호 형식에 어긋납니다. ex) 12(3)-123(4)-1234</p>
        )}
      </div>

      {/* Postal Code: string */}
      <div className={classes.input}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          className={nameHasError ? classes.invalid : ''}
          type='text'
          id='postal'
          onChange={nameInputChange}
          onBlur={nameInputBlur}
          value={nameValue}
        />
        {nameHasError && <p>우편번호를 입력해주세요.</p>}
      </div>

      {/* Signature: checkbox */}
      <div className={classes.input}>
        <label htmlFor='signature'>Signature</label>
        <input type='checkbox' id='signature' onClick={handleCheckInput} />
        {!isSigned && <p>서명이 필요합니다.</p>}
      </div>

      <button type='button' onClick={props.onCancel}>
        Cancel
      </button>
      <button disabled={!formIsValid}>Submit</button>
    </form>
  );
};

export default Checkout;
