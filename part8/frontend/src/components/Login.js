import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { TextField, Button, Typography } from '@material-ui/core';
import { NotificationContext } from '../context';
import { LOGIN } from '../queries';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      addMessage(error.graphQLErrors[0].message, 'error');
    },
    onCompleted: (data) => {
      addMessage('Successfully logged in', 'success');
    },
  });

  const history = useHistory();
  const { addMessage } = useContext(NotificationContext);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
      history.push('/');
    }
  }, [result.data]); // eslint-disable-line

  const handleLogin = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <Typography variant="h2">Login</Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            value={username}
            variant="outlined"
            label="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            value={password}
            variant="outlined"
            type="password"
            label="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button color="primary" variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
