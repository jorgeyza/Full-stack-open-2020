import React, { useState, useEffect, useContext } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Container, Typography, Box } from '@material-ui/core';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import Notify from './components/Notify';
import NewBook from './components/NewBook';
import Navigation from './components/Navigation';
import Recommended from './components/Recommended';
import { NotificationContext } from './context';
import { ALL_BOOKS, BOOK_ADDED } from './queries';

const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const history = useHistory();
  const { addMessage } = useContext(NotificationContext);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      const idsArray = set.map((b) => b.id);
      console.log('includedIn -> idsArray', idsArray);
      console.log('includedIn -> object.id', object.id);
      return idsArray.includes(object.id);
    };
    let dataInStore;
    try {
      dataInStore = client.readQuery({ query: ALL_BOOKS });
      console.log('updateCacheWith -> dataInStore', dataInStore.allBooks);
      if (!dataInStore) {
        return;
      }
      console.log(
        'updateCacheWith -> includedIn(dataInStore.allBooks, addedBook)',
        includedIn(dataInStore.allBooks, addedBook)
      );
      if (!includedIn(dataInStore.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks: dataInStore.allBooks.concat(addedBook) },
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      console.log('subscription executed');
      addMessage(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    if (token) {
      setToken(token);
    }
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    history.push('/');
  };

  return (
    <Container>
      <Navigation token={token} handleLogout={handleLogout} />
      <Notify />
      <Switch>
        <Route path="/login">
          <Login setToken={setToken} />
        </Route>
        <Route path="/authors">
          <Authors />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/add-book">
          <NewBook updateCacheWith={updateCacheWith} />
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
