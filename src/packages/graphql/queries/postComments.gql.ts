import { gql } from "graphql-request";

export const CommentFragment = gql`
  fragment CommentFragment on Comment {
    id
    text
    created_at
    _count {
      likes
    }
    created_by {
      id
      name
    }
    likes {
      user_id
    }
  }
`;

export const PostCommentsQuery = gql`
  ${CommentFragment}
  query PostComments($post_id: Int!) {
    postComments(post_id: $post_id) {
      ...CommentFragment
    }
  }
`;

export const CreateCommentMutation = gql`
  ${CommentFragment}
  mutation CreateComment($text: String!, $post_id: Int!, $user_id: Int!) {
    createComment(text: $text, post_id: $post_id, user_id: $user_id) {
      ...CommentFragment
    }
  }
`;
