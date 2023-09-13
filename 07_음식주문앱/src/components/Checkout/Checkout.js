import React, { /*useContext,*/ useRef, useState } from 'react';

import useInput from '../hooks/useInput';
// import CartContext from '../../store/cart-context';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;
const regExp = new RegExp(/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/);
const isPhoneNumber = (value) => regExp.test(value);

const Checkout = (props) => {
  // 체크박스 핸들링
  const [isSigned, setIsSigned] = useState(false);
  const [formInputsValidity, setFormInputValidity] = useState({
    name: true,
    phoneNumber: true,
    postalCode: true,
    signature: true,
  });

  const nameInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const postalCodeInputRef = useRef();
  const signatureInputRef = useRef();

  const handleConfirm = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredPhoneNumberIsValid = isPhoneNumber(enteredPhoneNumber);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredSignatureIsValid = isSigned;

    setFormInputValidity({
      name: enteredNameIsValid,
      phoneNumber: enteredPhoneNumberIsValid,
      postalCode: enteredPostalCodeIsValid,
      signature: enteredSignatureIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredPhoneNumberIsValid &&
      enteredPostalCodeIsValid &&
      enteredSignatureIsValid;

    if (!formIsValid) {
      return;
    }

    // Submit cart data
    props.onConfirm({
      name: enteredName,
      phoneNumber: enteredPhoneNumber,
      postalCode: enteredPostalCode,
      signature: isSigned,
    });
  };

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

  const handleCheckInput = () => {
    setIsSigned((prevState) => !prevState);
  };

  // let formIsValid = false;

  // if (nameIsValid && phoneIsValid && isSigned) {
  //   formIsValid = true;
  // } else {
  //   formIsValid = false;
  // }

  // const cartCtx = useContext(CartContext);

  // const saveOrder = async (orderInfo) => {
  //   const now = new Date();
  //   const hh = now.getHours();
  //   const mm = now.getMinutes();
  //   const ss = now.getSeconds();

  //   const orderDate = now.toISOString().split('T')[0];
  //   const orderTime = `${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${
  //     ss < 10 ? `0${ss}` : ss
  //   }`;

  //   const newOrderInfo = {
  //     ...orderInfo,
  //     orderTime,
  //     orderDate,
  //   };

  //   try {
  //     await fetch(
  //       'https://react-food-order-app-4c35a-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           user: newOrderInfo,
  //           orderedItems: cartCtx.itetms,
  //         }),
  //       }
  //     );
  //   } catch (error) {
  //     console.log('Save order Error!');
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!formIsValid) {
  //     return;
  //   }

  //   props.onSubmit([nameValue, phoneValue]); // 영수증 작성을 위한 정보

  //   // 주문서 데이터베이스에 POST
  //   const orderInfo = {
  //     items: cartCtx.items,
  //     totalAmount: +cartCtx.totalAmount.toFixed(2),
  //     name: nameValue,
  //     phoneNumber: phoneValue,
  //   };

  //   saveOrder(orderInfo);
  // };

  const nameInputClasses = `${classes.input} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;

  const phoneNumberInputClasses = `${classes.input} ${
    formInputsValidity.phoneNumber ? '' : classes.invalid
  }`;

  const postalCodeInputClasses = `${classes.input} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`;

  const signatureInputClasses = `${classes.input} ${
    formInputsValidity.signature ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={handleConfirm}>
      <div className={classes.order}>📄Order Sheet</div>
      {/* Name: string */}
      <div className={nameInputClasses}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          onChange={nameInputChange}
          onBlur={nameInputBlur}
          ref={nameInputRef}
          value={nameValue}
        />
        {!formInputsValidity.name && <p>이름을 입력해주세요.</p>}
      </div>

      {/* Phone number: number */}
      <div className={phoneNumberInputClasses}>
        <label htmlFor='phone'>Tel</label>
        <input
          type='text'
          id='phone'
          onChange={phoneInputChange}
          onBlur={phoneInputBlur}
          ref={phoneNumberInputRef}
          value={phoneValue}
        />
        {!formInputsValidity.phoneNumber && (
          <p>전화번호 형식에 어긋납니다. ex) 12(3)-123(4)-1234</p>
        )}
      </div>

      {/* Postal Code: string */}
      <div className={postalCodeInputClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>우편번호를 입력해주세요. (5자리)</p>
        )}
      </div>

      {/* Signature: checkbox */}
      <div className={signatureInputClasses}>
        <label htmlFor='signature'>Signature</label>
        <input
          type='checkbox'
          id='signature'
          onClick={handleCheckInput}
          ref={signatureInputRef}
        />
        {!formInputsValidity.signature && <p>서명이 필요합니다.</p>}
      </div>

      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Submit</button>
      </div>
    </form>
  );
};

export default Checkout;
