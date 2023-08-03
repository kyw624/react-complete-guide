import React from 'react';

import InvestTableHead from './InvestTableHead';
import InvestTableRow from './InvestTableRow';

import './InvestTable.css';

function InvestTable(props) {
  /* Todo: Show below table conditionally (only once result data is available) */
  /* Show fallback text if no data is available */

  const totalInterest = (index) => {
    return props.datas
      .slice(0, index)
      .reduce((acc, cur) => acc + cur.yearlyInterest, 0);
  };

  const newDatas = props.datas.map((data) => {
    return [
      data.year,
      data.savingsEndOfYear,
      data.yearlyInterest,
      totalInterest(data.year),
    ];
  });

  return (
    <table className="result">
      <InvestTableHead />
      <tbody>
        {newDatas.map((data) => (
          <InvestTableRow key={data[0]} data={data} />
        ))}
      </tbody>
    </table>
  );
}

export default InvestTable;
