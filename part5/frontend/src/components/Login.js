import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

const Login = ({
  message,
  username,
  password,
  handleInputChange,
  handleLogin,
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <Message message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={handleInputChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  message: PropTypes.objectOf(PropTypes.string).isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
