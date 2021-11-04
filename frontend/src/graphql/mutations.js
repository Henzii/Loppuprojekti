import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation($name: String!, $password: String!, $email: String) {
    addUser(name: $name, password: $password, email: $email) {
      id
    }
  }
`;

export const LOGIN = gql`
mutation($name: String!, $password: String!) {
  login(name: $name, password: $password)
  
}
`;

export const GET_ME = gql`
query {
  getMe
}
`;
