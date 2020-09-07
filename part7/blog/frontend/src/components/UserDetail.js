import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const UserDetail = () => {
  const usersSelector = useSelector(({ user }) => user);
  const id = useParams().id;
  const user = usersSelector.find((user) => user.id === id);
  if (!user) {
    return null;
  }
  return (
    <div>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="h6">Added blogs</Typography>
      <List>
        {user.blogs.map((b) => (
          <ListItem key={b.id}>
            <ListItemText>{b.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserDetail;
