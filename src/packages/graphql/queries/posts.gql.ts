import { gql } from "graphql-request";

export const createPostMutation = gql`
  mutation CreatePost(
    $user_id: Int!
    $title: String!
    $text: String!
    $tags: [String!]!
    $visibility: Visibility!
  ) {
    createPost(
      user_id: $user_id
      title: $title
      text: $text
      tags: $tags
      visibility: $visibility
    ) {
      id
      created_by {
        id
        name
      }
      title
      text
      tags
      visibility
    }
  }
`;

export const addPostLikeMutation = gql`
  mutation AddPostLike($user_id: Int!, $post_id: Int!) {
    addPostLike(user_id: $user_id, post_id: $post_id) {
      id
    }
  }
`;

export const removePostLikeMutation = gql`
  mutation RemovePostLike($user_id: Int!, $post_id: Int!) {
    removePostLike(user_id: $user_id, post_id: $post_id)
  }
`;
