import React from 'react';

import classes from './Button.module.css';

function Button(props) {
  const handleClick = () => {
    if (props.type !== 'modal') return;

    props.onClick(false);
  };

  return (
    <button onClick={handleClick} type={props.type} className={classes.button}>
      {props.value}
    </button>
  );
}

export default Button;
