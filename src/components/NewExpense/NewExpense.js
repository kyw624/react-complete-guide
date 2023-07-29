import React, { useState } from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

function NewExpense(props) {
  const [isVisible, setIsVisible] = useState(false);

  const handleExpenseDataSave = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    props.onExpenseAdd(expenseData);
  };

  const handleFormOpen = () => {
    setIsVisible(true);
  };

  const handleFormClose = () => {
    setIsVisible(false);
  };

  return (
    <div className="new-expense">
      {!isVisible && <button onClick={handleFormOpen}>Add New Expense</button>}
      {isVisible && (
        <ExpenseForm
          onExpenseDataSave={handleExpenseDataSave}
          onCancel={handleFormClose}
        />
      )}
    </div>
  );
}

export default NewExpense;
