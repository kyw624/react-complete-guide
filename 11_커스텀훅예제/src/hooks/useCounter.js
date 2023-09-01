import { useState, useEffect } from 'react';

const useCounter = (value) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('useEffect RUNINNG');
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + value);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return counter;
};

export default useCounter;
