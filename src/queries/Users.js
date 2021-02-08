import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($offset: Int, $limit: Int, $order: Int, $orderBy: String) {
  	users @client (offset: $offset, limit: $limit, order: $order, orderBy: $orderBy),
    usersCount @client
  }
`;
