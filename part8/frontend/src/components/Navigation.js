import React from 'react';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Navigation = ({ token, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/authors">
          Authors
        </Button>
        <Button color="inherit" component={Link} to="/books">
          Books
        </Button>
        {!token ? (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/add-book">
              Add book
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
