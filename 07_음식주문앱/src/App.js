import React, { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const handleCartShow = () => {
    setCartIsShown(true);
  };

  const handleCartHide = () => {
    setCartIsShown(false);
  };

  return (
    <div>
      {cartIsShown && <Cart onClose={handleCartHide} />}
      <Header onCartShow={handleCartShow} />
      <main>
        <Meals />
      </main>
    </div>
  );
}

export default App;
