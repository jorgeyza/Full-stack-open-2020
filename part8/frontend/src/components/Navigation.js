import React from 'react';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/authors">
          Authors
        </Button>
        <Button color="inherit" component={Link} to="/books">
          Books
        </Button>
        <Button color="inherit" component={Link} to="/add-book">
          Add book
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
