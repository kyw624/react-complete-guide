import React from 'react';

function InvestInput(props) {
  return (
    <p>
      <label htmlFor={props.item.name}>{props.item.title}</label>
      <input type="number" id={props.item.name} onChange={props.onChange} />
    </p>
  );
}

export default InvestInput;
