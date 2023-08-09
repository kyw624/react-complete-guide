import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import Wrapper from '../Helper/Wrapper';
import classes from './AddUser.module.css';

function AddUser(props) {
  const [userInput, setUserInput] = useState({
    username: '',
    age: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      userInput.username.trim().length === 0 ||
      userInput.age.trim().length === 0
    ) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }

    if (+userInput.age < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }

    props.onAddUser(userInput);

    setUserInput({
      username: '',
      age: '',
    });
  };

  const handleError = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <Modal
          title={error.title}
          message={error.message}
          onError={handleError}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={userInput.username}
            onChange={handleChange}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            value={userInput.age}
            onChange={handleChange}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
}

export default AddUser;
