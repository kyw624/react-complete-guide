import React from 'react';

import './InvestFormButton.css';

function InvestFormButton(props) {
  return (
    <button type={props.type} className={props.class} onClick={props.onReset}>
      {props.children}
    </button>
  );
}

export default InvestFormButton;
