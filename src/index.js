import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import users from './mocks/data.json';
import { GET_USERS } from './queries/Users';

const createPageData = (data, offset, limit) => {
  return data && data.slice(offset, offset + limit);
};

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          read(existing, { variables: { offset = 0, limit = existing?.length, order = 1, orderBy = null } }) {
            if (!orderBy) return createPageData(existing, offset, limit);
            const data = [...existing];

            data.sort((a, b) => {
              if (a[orderBy] < b[orderBy]) {
                return order ? 1 : -1;
              }
              if (a[orderBy] > b[orderBy]) {
                return order ? -1 : 1;
              }
              return 0;
            });

            return createPageData(data, offset, limit);
          },
        },
        usersCount: {
          read(existing) {
            return existing;
          },
        }
      },
    },
  },
});

cache.writeQuery({
  query: GET_USERS,
  data: {
    users: users,
    usersCount: users.length,
  },
});

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  resolvers: {
    Query: {
      users: (launch, _args, { cache }) => {
        return cache.readQuery({ query: GET_USERS });
      },
      usersCount: (launch, _args, { cache }) => {
        return cache.readQuery({ query: GET_USERS });
      },
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
