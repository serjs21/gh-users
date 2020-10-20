import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const API_URL = 'https://api.github.com/graphql';
export const token = '4577548252cd98f0dd7d07e07f1e7d46511cae84';

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

window.client = client;
window.gql = gql;
export default client;