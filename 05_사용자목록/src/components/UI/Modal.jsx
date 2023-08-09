import React from 'react';

import Card from './Card';
import Button from './Button';
import classes from './Modal.module.css';

function Modal(props) {
  return (
    <>
      <div className={classes.backdrop} onClick={props.onError} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.footer}>
          <Button onClick={props.onError}>Okay</Button>
        </footer>
      </Card>
    </>
  );
}

export default Modal;
