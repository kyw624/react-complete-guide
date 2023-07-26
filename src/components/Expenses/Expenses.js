import React, { useState } from 'react';

import Card from '../UI/Card';
import ExpenseItem from './ExpenseItem';
import ExpensesFilter from './ExpensesFilter';
import './Expenses.css';

function Expenses({ items }) {
  const [selectedYear, setSelectedYear] = useState('2022');

  const handleFilterChange = (year) => {
    setSelectedYear(year);

    newItems = handleItemsUpdate(items);
  };

  const handleItemsUpdate = (items) => {
    return items.filter((item) => item.date.getFullYear() == selectedYear);
  };

  let newItems = handleItemsUpdate(items);

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={selectedYear}
        onFilterChange={handleFilterChange}
      />
      {newItems.map((expense, i) => (
        <ExpenseItem data={expense} />
      ))}
    </Card>
  );
}

export default Expenses;
