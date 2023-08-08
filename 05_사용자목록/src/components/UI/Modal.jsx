import React from 'react';

import Card from './Card';
import Button from './Button';

import classes from './Modal.module.css';

function Modal(props) {
  return (
    <div className={classes.container}>
      <Card size="inherit">
        <div className={classes.header}>Invalid input</div>
        <div className={classes.body}>Please enter a valid</div>
        <Button onClick={props.onClick} type="modal" value="Okay" />
      </Card>
    </div>
  );
}

export default Modal;
