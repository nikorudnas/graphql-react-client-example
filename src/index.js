/* eslint react/jsx-filename-extension: 0 */
// Import modules used to init the App
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import logger from './components/utils/logger';

// Token middleware. Add token to every query
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

// Error middleware. Display errors in console
const errorLink = onError(({ graphQLErrors, networkError }) => {
  // GraphQL -specific errors
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      logger(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  // Network -specific errors
  if (networkError) logger(`[Network error]: ${networkError}`);
});

// GraphQL server endpoint
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:4000/graphql',
});

// Apply middlewares and connect to endpoint. Use InMemoryCache to cache queries
// httpLink is terminating so it needs to be last
const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

// Wrap the App in ApolloProvider to access the 'client' prop.
// Render the App
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
