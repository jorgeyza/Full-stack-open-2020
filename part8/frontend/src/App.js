import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { Switch, Route } from 'react-router-dom';
import { Container, Typography, Box } from '@material-ui/core';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import Notify from './components/Notify';
import NewBook from './components/NewBook';
import Navigation from './components/Navigation';
import Recommended from './components/Recommended';

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    if (token) {
      setToken(token);
    }
  }, []);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <Container>
      <Navigation token={token} handleLogout={handleLogout} />
      <Notify errorMessage={errorMessage} />
      <Switch>
        <Route path="/login">
          <Login setToken={setToken} setError={notify} />
        </Route>
        <Route path="/authors">
          <Authors />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/add-book">
          <NewBook />
        </Route>
        <Route path="/recommend">
          <Recommended />
        </Route>
        <Route path="/">
          <Typography variant="h1" style={{ textAlign: 'center' }}>
            Library app{' '}
            {
              // eslint-disable-next-line jsx-a11y/accessible-emoji
              <Box component="span" role="img" aria-label="books">
                📕📗📘📙
              </Box>
            }
          </Typography>
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
