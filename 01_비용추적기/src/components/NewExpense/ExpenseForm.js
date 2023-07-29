import React, { useState } from 'react';

import './ExpenseForm.css';

function ExpenseForm(props) {
  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
  });

  const handleChange = (event) => {
    const type = event.target.type;
    const value = event.target.value;
    const target =
      type === 'text'
        ? 'enteredTitle'
        : type === 'number'
        ? 'enteredAmount'
        : 'enteredDate';

    // setUserInput({
    //   ...userInput,
    //   [target]: value,
    // });

    setUserInput((prevState) => {
      return {
        ...prevState,
        [target]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onExpenseDataSave({
      title: userInput.enteredTitle,
      amount: +userInput.enteredAmount,
      date: new Date(userInput.enteredDate),
    });

    setUserInput((prevState) => {
      return {
        ...prevState,
        enteredTitle: '',
        enteredAmount: '',
        enteredDate: '',
      };
    });

    props.onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={userInput.enteredTitle}
            onChange={handleChange}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            value={userInput.enteredAmount}
            min="0.01"
            step="0.01"
            onChange={handleChange}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            value={userInput.enteredDate}
            min="2019-01-01"
            max="2022-12-31"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}

export default ExpenseForm;
