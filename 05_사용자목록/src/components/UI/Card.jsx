import React from 'react';

import classes from './Card.module.css';

function Card(props) {
  return (
    <div
      style={{ width: props.size, height: props.size }}
      className={classes.card}
    >
      {props.children}
    </div>
  );
}

export default Card;
