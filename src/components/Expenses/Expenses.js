import React from 'react';

import Card from '../UI/Card';
import ExpenseItem from './ExpenseItem';
import './Expenses.css';

function Expenses({ items }) {
  return (
    <Card className="expenses">
      {items.map((expense, i) => (
        <ExpenseItem data={expense} />
      ))}
    </Card>
  );
}

export default Expenses;
