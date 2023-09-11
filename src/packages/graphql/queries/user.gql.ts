import { gql } from "graphql-request";

export const UserFragment = gql`
  fragment UserFragment on user {
    id
    name
    email
    verified
  }
`;
