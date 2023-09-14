import { gql } from "graphql-request";

export const feedQuery = gql`
  query FeedQuery($id: Int!, $startIndex: Int!) {
    feed(id: $id, startIndex: $startIndex) {
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
