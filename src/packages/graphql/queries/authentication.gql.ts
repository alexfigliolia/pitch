import { gql } from "graphql-request";
import { UserFragment } from "./user.gql";

export const logoutQuery = gql`
  query Logout {
    logout
  }
`;

export const loginQuery = gql`
  ${UserFragment}
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserFragment
    }
  }
`;

export const verifyQuery = gql`
  ${UserFragment}
  query Verify($token: String!) {
    verifyTokenMobile(token: $token) {
      ...UserFragment
    }
  }
`;

export const onboardMutation = gql`
  ${UserFragment}
  mutation onBoard($name: String!, $email: String!, $password: String!) {
    onboard(name: $name, email: $email, password: $password) {
      ...UserFragment
    }
  }
`;
