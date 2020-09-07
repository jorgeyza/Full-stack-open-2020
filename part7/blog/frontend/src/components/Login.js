import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/loginReducer';
import { notify } from '../reducers/notificationReducer';
import Message from './Message';
import { Button, TextField, Typography } from '@material-ui/core';

const Login = () => {
  const [loginInput, setLoginInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: '',
      password: '',
    }
  );
  const notificationSelector = useSelector(({ notification }) => notification);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginInput({ [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser(loginInput));
      setLoginInput({ username: '', password: '' });
      dispatch(
        notify({ type: 'success', content: 'Successfully logged in' }, 5000)
      );
    } catch (error) {
      dispatch(notify({ type: 'error', content: 'Wrong credentials' }, 5000));
    }
  };

  return (
    <div>
      <Typography variant="h2">Log in to application</Typography>
      <Message message={notificationSelector} />
      <form onSubmit={handleLogin}>
        <TextField
          value={loginInput.username}
          label="username"
          name="username"
          onChange={handleInputChange}
        />
        <TextField
          style={{ marginLeft: 10 }}
          type="password"
          value={loginInput.password}
          label="password"
          name="password"
          onChange={handleInputChange}
        />
        <Button style={{ marginLeft: 10 }} variant="outlined" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default Login;
