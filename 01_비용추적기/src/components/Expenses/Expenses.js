import React, { useState } from 'react';

import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpenseItem from './ExpenseItem';
import ExpensesChart from './ExpensesChart';
import './Expenses.css';

function Expenses({ items }) {
  const [selectedYear, setSelectedYear] = useState('2022');

  const handleFilterChange = (year) => {
    setSelectedYear(year);
  };

  const filteredExpenses = items.filter(
    (item) => item.date.getFullYear().toString() === selectedYear
  );

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={selectedYear}
        onFilterChange={handleFilterChange}
      />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpensesList items={filteredExpenses} />
    </Card>
  );
}

export default Expenses;
