import React, { useState } from 'react';

import useInput from '../hooks/useInput';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onSubmit([nameValue, phoneValue]); // 영수증 작성을 위한 정보
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name: string */}
      <div>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          onChange={nameInputChange}
          onBlur={nameInputBlur}
          value={nameValue}
        />
        {nameHasError && <p>이름을 입력해주세요.</p>}
      </div>

      {/* Phone number: number */}
      <div>
        <label htmlFor='phone'>Tel</label>
        <input
          type='text'
          id='phone'
          onChange={phoneInputChange}
          onBlur={phoneInputBlur}
          value={phoneValue}
        />
        {phoneHasError && (
          <p>전화번호 형식에 어긋납니다. ( 00(0)-000(0)-0000 )</p>
        )}
      </div>

      {/* Signature: checkbox */}
      <div>
        <label htmlFor='signature'>Signature</label>
        <input type='checkbox' id='signature' onClick={handleCheckInput} />
        {!isSigned && <p>서명이 필요합니다.</p>}
      </div>
      <button disabled={!formIsValid}>Submit</button>
    </form>
  );
};

export default Checkout;
