import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getAuthCookie, removeAuthCookie } from '../../utils/setAuthTokens';
import { REACT_APP_API } from '../Env';

const httpLink = new HttpLink({
  uri: REACT_APP_API,
});

const authLink = setContext((_, { headers }) => {
  const authentication = getAuthCookie('bee');
  return {
    headers: {
      ...headers,
      authorization: !!authentication && `Bearer ${authentication}`,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === 'Unauthenticated.') {
        removeAuthCookie('bee');
        window.location.href = '/';
      } else {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      }
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
