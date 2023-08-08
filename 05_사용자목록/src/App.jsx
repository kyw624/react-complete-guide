import React, { useState } from 'react';

import Card from './components/UI/Card';
import AddUser from './components/AddUser/AddUser';
import UserList from './components/UserList/UserList';
import Modal from './components/UI/Modal';

function App() {
  const [users, setUsers] = useState([]);
  const [isError, setIsError] = useState(false);

  const updateUser = (user) => {
    const userObj = {
      ...user,
      id: users.length !== 0 ? users[users.length - 1].id + 1 : 1,
    };

    setUsers((prevState) => {
      return [...prevState, userObj];
    });
  };

  const openModal = () => {
    setIsError(true);
  };

  const closeModal = () => {
    setIsError(false);
  };

  return (
    <div className="container">
      {isError && <Modal onClick={closeModal} />}
      <Card>
        <AddUser onError={openModal} onUpdate={updateUser} />
      </Card>
      {users.length > 0 && <UserList data={users} />}
    </div>
  );
}

export default App;
