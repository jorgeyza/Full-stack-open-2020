import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
