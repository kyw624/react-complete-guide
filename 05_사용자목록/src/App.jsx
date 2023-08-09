import React, { useState } from 'react';

import AddUser from './components/AddUser/AddUser';
import UserList from './components/UserList/UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [keyCount, setKeyCount] = useState(1);

  const updateUser = (user) => {
    const userObj = {
      ...user,
      id: keyCount,
    };

    setKeyCount((prevKey) => prevKey + 1);

    setUsers((prevUsers) => {
      return [...prevUsers, userObj];
    });
  };

  return (
    <>
      <AddUser onAddUser={updateUser} />
      {users.length > 0 && <UserList data={users} />}
    </>
  );
}

export default App;
