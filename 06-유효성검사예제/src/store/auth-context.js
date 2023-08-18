import React from 'react';

// Why CamelCase?
//   AuthContext 자체는 컴포넌트가 아니지만,
//   컴포넌트를 포함 할 개체이기 때문에
const AuthContext = React.createContext({
  isLoggedIn: false,
});

export default AuthContext;
