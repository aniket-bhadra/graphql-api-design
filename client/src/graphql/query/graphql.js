import { gql } from "@apollo/client";

export const getUsers = gql`
  #graphql
  query getUsers {
    users {
      name
      _id
      email
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

export const deleteUser = gql`
  mutation deleteUser($ids: ID!) {
    deleteUser(id: $ids) {
      _id
    }
  }
`;

export const updateUser = gql`
  mutation updateUser($id: ID!, $updatedValue: UpdateUserInput!) {
    updateUser(id: $id, updatedValue: $updatedValue) {
      name
      email
      _id
    }
  }
`;




