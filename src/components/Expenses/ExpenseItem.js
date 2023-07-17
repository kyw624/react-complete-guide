import React from 'react';

import Card from '../UI/Card';
import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';

function ExpenseItem({ data }) {
  // const expenseDate = new Date(2023, 6, 17);
  // const expenseTitle = 'Car Insurance';
  // const expenseAmount = 294.67;

  return (
    <Card className="expense-item">
      <ExpenseDate date={data.date} />
      <div className="expense-item__description">
        <h2>{data.title}</h2>
        <div className="expense-item__price">${data.amount}</div>
      </div>
    </Card>
  );
}

export default ExpenseItem;
