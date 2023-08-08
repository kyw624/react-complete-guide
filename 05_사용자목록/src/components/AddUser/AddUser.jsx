import React, { useState } from 'react';

import Button from '../UI/Button';

import classes from './AddUser.module.css';

function AddUser(props) {
  const [userInput, setUserInput] = useState({
    username: '',
    age: '',
  });

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

    if (userInput.username === '' || userInput.age === '') {
      props.onError();
      return;
    }

    props.onUpdate(userInput);

    setUserInput({
      username: '',
      age: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className={classes['input-group']}>
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          type="text"
          id="username"
          value={userInput.username}
        />
      </p>
      <p className={classes['input-group']}>
        <label htmlFor="age">Age (Years)</label>
        <input
          onChange={handleChange}
          type="number"
          id="age"
          value={userInput.age}
        />
      </p>
      <Button type="submit" value="Add User" />
    </form>
  );
}

export default AddUser;
