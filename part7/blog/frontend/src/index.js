import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Router>
      <Provider store={store}>
        <Container>
          <App />
        </Container>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
