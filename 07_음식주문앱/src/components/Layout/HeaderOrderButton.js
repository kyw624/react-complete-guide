import { useContext } from 'react';

import OrderContext from '../../store/order-context';
import classes from './HeaderCartButton.module.css';

const HeaderOrderButton = (props) => {
  const orderCtx = useContext(OrderContext);

  return (
    <button className={classes.button} onClick={() => console.log('Clicked!')}>
      <span>Your Order</span>
      <span className={classes.badge}>{orderCtx.orders.length}</span>
    </button>
  );
};

export default HeaderOrderButton;
