import React, { useState } from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

function NewExpense(props) {
  const handleExpenseDataSave = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    props.onExpenseAdd(expenseData);
  };

  return (
    <div className="new-expense">
      <ExpenseForm onExpenseDataSave={handleExpenseDataSave} />
    </div>
  );
}

export default NewExpense;
