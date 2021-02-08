import { gql } from '@apollo/client';

export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser @client (id: $id)
  }
`;

export const EDIT_USER = gql`
  mutation EditUser($id: String!) {
    editUser @client (id: $id)
  }
`;
