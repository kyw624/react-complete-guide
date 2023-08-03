import React, { useState } from 'react';

import InvestInput from './InvestInput';
import InvestFormButton from './InvestFormButton';

import './InvestForm.css';

function InvestForm(props) {
  /*
    현재 저축액 | 매년 추가 할 금액
    예상 투자 수익률 | 투자 기간
  */

  const inputItems = [
    { id: 1, name: 'current-savings', title: 'Current Savings ($)' }, // 현재 저축액
    { id: 2, name: 'yearly-contribution', title: 'Yearly Savings ($)' }, // 매년 추가할 금액
    {
      id: 3,
      name: 'expected-return',
      title: 'Expected Interest (%, per year)',
    }, // 예상 이율
    { id: 4, name: 'duration', title: 'Investment Duration (years)' }, // 투자 기간
  ];

  const [userInput, setUserInput] = useState({
    'current-savings': '',
    'yearly-contribution': '',
    'expected-return': '',
    duration: '',
  });

  const handleInputChange = (e) => {
    setUserInput((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleReset = () => {
    setUserInput({
      'current-savings': '',
      'yearly-contribution': '',
      'expected-return': '',
      duration: '',
    });
    props.setDatas([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(userInput).includes('')) return;

    props.onCalculate(userInput);
  };

  return (
    <form className="form">
      <div className="input-group">
        {inputItems.map((inputItem) => (
          <InvestInput
            key={inputItem.id}
            item={inputItem}
            onChange={handleInputChange}
          />
        ))}
      </div>
      <p className="actions">
        <InvestFormButton type="reset" onReset={handleReset}>
          Reset
        </InvestFormButton>
        <InvestFormButton type="submit" onSubmit={handleSubmit}>
          Calculate
        </InvestFormButton>
      </p>
    </form>
  );
}

export default InvestForm;
