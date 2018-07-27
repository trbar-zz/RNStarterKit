import React from 'react';
import { Provider } from 'react-redux';
import { Sentry } from 'react-native-sentry';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GRAPHQL_URL } from './config/secrets'

import { SENTRYURL } from './config/secrets';

import App from './App';
import store from './store'

const graphqlUrl = GRAPHQL_URL
const httpLink = new HttpLink({ uri: graphqlUrl });

// adding auth headers
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: "Bearer " + null
    }
  });
  return forward(operation);
});


// Creating a client instance
const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({
    addTypename: false
  })
});

export default function createApp() {
  Sentry.config(SENTRYURL).install();
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    );
}
