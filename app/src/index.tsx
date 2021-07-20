import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import { getCookie } from './utils/setAuthTokens';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/style.css';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API || 'http://localhost:8000/graphql',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  const authentication = getCookie('bee-authorization');
  return {
    headers: {
      ...headers,
      authorization: !!authentication?.access_token && `Bearer ${authentication?.access_token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
