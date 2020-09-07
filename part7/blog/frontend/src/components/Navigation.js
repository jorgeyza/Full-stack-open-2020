import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logoutUser } from '../reducers/loginReducer';
import { notify } from '../reducers/notificationReducer';
import { useSelector, useDispatch } from 'react-redux';

const Navigation = () => {
  const loginSelector = useSelector(({ login }) => login);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(logoutUser());
    dispatch(
      notify({ type: 'success', content: 'Successfully logged out' }, 5000)
    );
    history.push('/');
  };

  return (
    <nav style={{ display: 'flex', backgroundColor: 'lightgray' }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ display: 'inline-block', padding: '0px 5px' }}>
          <Link to="/">blogs</Link>
        </li>
        <li style={{ display: 'inline-block', padding: '0px 5px' }}>
          <Link to="/users">users</Link>
        </li>
      </ul>
      <span>{loginSelector.name} logged in</span>
      <button style={{ marginLeft: 5 }} type="button" onClick={handleLogout}>
        logout
      </button>
    </nav>
  );
};

export default Navigation;
