import React from 'react';

function InvestTableRow(props) {
  // 연도 / 총 저축액 / 연 이자 / 총 이자 / 투하자본 (총 저축액 - 총 이자)

  const [year, totalSavings, yearlyInterest, totalInterest] = props.data;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <tr>
      <td>{year}</td>
      <td>{formatter.format(totalSavings)}</td>
      <td>{formatter.format(yearlyInterest)}</td>
      <td>{formatter.format(totalInterest)}</td>
      <td>{formatter.format(totalSavings - totalInterest)}</td>
    </tr>
  );
}

export default InvestTableRow;
