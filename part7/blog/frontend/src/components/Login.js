import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/userReducer';
import { notify } from '../reducers/notificationReducer';
import Message from './Message';

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
      dispatch(loginUser(loginInput));
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
      <h2>log in to application</h2>
      <Message message={notificationSelector} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={loginInput.username}
            name="username"
            onChange={handleInputChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={loginInput.password}
            name="password"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
