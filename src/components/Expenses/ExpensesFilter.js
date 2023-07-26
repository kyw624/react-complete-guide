import React from 'react';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {
  const handleDropdownChange = (e) => {
    props.onFilterChange(e.target.value);
  };

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select value={props.selected} onChange={handleDropdownChange}>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
      <div className="expenses-filter__chart">
        <div className="chart__month-wrap">
          <progress className="progress" max="100" value="70" />
          <p>Jan</p>
        </div>
        <div className="chart__month-wrap">
          <progress className="progress" max="100" value="70" />
          <p>Feb</p>
        </div>
        <div className="chart__month-wrap">
          <progress className="progress" max="100" value="70" />
          <p>Mar</p>
        </div>
        <div className="chart__month-wrap">
          <progress className="progress" max="100" value="70" />
          <p>Apr</p>
        </div>
        <div className="chart__month-wrap">
          <progress className="progress" max="100" value="70" />
          <p>May</p>
        </div>
        <div className="chart__month-wrap">
          <progress className="progress" max="100" value="70" />
          <p>Jun</p>
        </div>
        <div className="chart__month-wrap">
          <progress className="progress" max="100" value="70" />
          <p>Jul</p>
        </div>
        <div className="chart__month-wrap">
          <progress className="progress" max="100" value="70" />
          <p>Aug</p>
        </div>
        <div className="chart__month-wrap">
          <progress className="progress" max="100" value="70" />
          <p>Sep</p>
        </div>
        <div className="chart__month-wrap">
          <progress className="progress" max="100" value="70" />
          <p>Oct</p>
        </div>
        <div className="chart__month-wrap">
          <progress className="progress" max="100" value="70" />
          <p>Nov</p>
        </div>
        <div className="chart__month-wrap">
          <progress className="progress" max="100" value="70" />
          <p>Dec</p>
        </div>
      </div>
    </div>
  );
};

export default ExpensesFilter;
