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
