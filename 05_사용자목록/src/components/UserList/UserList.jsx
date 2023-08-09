import React from 'react';

import Card from '../UI/Card';
import classes from './UserList.module.css';

function UserList(props) {
  return (
    <Card className={classes.list}>
      <ul>
        {props.data.map((user) => (
          <li key={user.id}>
            {user.username} ({user.age} year old)
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default UserList;
