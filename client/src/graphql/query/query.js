import { gql } from "@apollo/client";

export const getUsers = gql`
  #graphql
  query getUsers {
    users {
      name
      _id
    }
  }
`;

export const addUser = gql`
  #graphql
  mutation addUser($name: String!, $email: String!) {
    newUser(name: $name, email: $email) {
      name
      email
    }
  }
`;
