import React from 'react';
import ReactDOM from 'react-dom';

import Card from './Card';
import Button from './Button';
import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onError} />;
};

const ModalOverlay = (props) => {
  return (
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
  );
};

function Modal(props) {
  /*
    ReactDOM.createPortal(arg1, arg2);
      - arg1: 렌더링 대상 노드
      - arg2: 포인터 (렌더링되어야 하는 실제 DOM 컨테이너를 가리킴)
  */
  // 위에서 따로 빼낸 Backdrop 컴포넌트에 props로 전달 후 컴포넌트 리턴 받음
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onError={props.onError} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onError={props.onError}
        />,
        document.getElementById('overlay-root')
      )}
    </>
  );
}

export default Modal;
