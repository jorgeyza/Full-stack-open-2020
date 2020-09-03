import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => {
  if (message.content === null) {
    return null;
  }

  return <div className={message.type}>{message.content}</div>;
};

Message.propTypes = {
  message: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Message;
