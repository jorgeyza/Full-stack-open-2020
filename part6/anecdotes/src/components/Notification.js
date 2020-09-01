import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return notification.message ? (
    <div style={style}>{notification.message}</div>
  ) : null;
};

export default Notification;
