import React from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import { Container } from '@material-ui/core';

const App = () => {
  return (
    <Container>
      <Navigation />
      <Switch>
        <Route path="/authors">
          <Authors />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/add-book">
          <NewBook />
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
