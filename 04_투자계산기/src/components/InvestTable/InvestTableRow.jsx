import React from 'react';

function InvestTableRow(props) {
  /*
    연도 / 총 저축액 / 연 이자 / 총 이자 / 투하자본 (총 저축액 - 총 이자)
  */
  return (
    <tr>
      <td>{props.data[0]}</td>
      <td>${props.data[1].toFixed(2)}</td>
      <td>${props.data[2].toFixed(2)}</td>
      <td>${props.data[3].toFixed(2)}</td>
      <td>${(props.data[1] - props.data[3]).toFixed(2)}</td>
    </tr>
  );
}

export default InvestTableRow;
