import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logoutUser } from '../reducers/loginReducer';
import { notify } from '../reducers/notificationReducer';
import { useSelector, useDispatch } from 'react-redux';
import { Button, AppBar, Toolbar, Typography } from '@material-ui/core';

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
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Typography>
          <em>{loginSelector.name} logged in</em>
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          style={{ marginLeft: 5 }}
          type="button"
          onClick={handleLogout}
        >
          logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
