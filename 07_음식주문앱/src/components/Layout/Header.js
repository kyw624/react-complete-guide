import React from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import HeaderOrderButton from './HeaderOrderButton';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <div style={{ display: 'flex' }}>
          <HeaderOrderButton />
          <HeaderCartButton onClick={props.onCartShow} />
        </div>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </>
  );
};

export default Header;
