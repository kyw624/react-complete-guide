import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate('/products');
  }

  return (
    <>
      <div>My Home Page</div>
      <p>
        Go to <Link to='products'>the list of products</Link>
      </p>
      <p>
        <button onClick={handleNavigate}>Navigate</button>
      </p>
    </>
  );
}

export default HomePage;
