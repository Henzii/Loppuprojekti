import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import './index.css';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import client from './utils/apolloClient';

ReactDOM.render(
  <ApolloProvider client={client}>
    <SnackbarProvider maxSnack={5}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SnackbarProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
