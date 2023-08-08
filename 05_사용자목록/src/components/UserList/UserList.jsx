import React from 'react';

import Card from '../UI/Card';

import classes from './UserList.module.css';

function UserList(props) {
  console.log(props.data);
  return (
    <Card>
      <ul className={classes.ul}>
        {props.data.map((user) => (
          <li className={classes.li} key={user.id}>
            {user.username} ({user.age} year old)
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default UserList;
