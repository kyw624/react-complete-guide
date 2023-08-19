import React, { useState, useEffect } from 'react';

// Why CamelCase?
//   AuthContext 자체는 컴포넌트가 아니지만,
//   컴포넌트를 포함 할 개체이기 때문에
const AuthContext = React.createContext({
  isLoggedIn: false,
  // Tip! 더미 함수 작성해두면
  // 컨텍스트 사용할 때 IDE 자동완성에 도움이 된다.
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInInformation = localStorage.getItem('isLoggedIn');

    if (loggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
