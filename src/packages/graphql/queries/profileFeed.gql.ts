import { gql } from "graphql-request";

export const profileFeedQuery = gql`
  query ProfileFeedQuery($id: Int!, $startIndex: Int!) {
    profileFeed(id: $id, startIndex: $startIndex) {
      id
      created_by {
        id
        name
      }
      title
      text
      tags
      visibility
      _count {
        likes
        comments
      }
    }
  }
`;
