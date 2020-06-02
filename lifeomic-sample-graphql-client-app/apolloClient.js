import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { BASE_URL, AUTH_TOKEN } from 'react-native-dotenv';

const uri = `${BASE_URL}/v1/graphql`

const link = createHttpLink({
  uri,
  headers: {
    authorization: `Bearer ${AUTH_TOKEN}`,
    'LifeOmic-Account': 'lifeomiclife',
  },
  credentials: 'include',
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
