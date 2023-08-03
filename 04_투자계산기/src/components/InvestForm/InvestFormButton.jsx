import React from 'react';

import './InvestFormButton.css';

function InvestFormButton(props) {
  return (
    <button
      type={props.type}
      className={props.type === 'reset' ? 'buttonAlt' : 'button'}
      onClick={props.type === 'reset' ? props.onReset : props.onSubmit}
    >
      {props.children}
    </button>
  );
}

export default InvestFormButton;
