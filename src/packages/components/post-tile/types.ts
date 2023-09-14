import type { Post } from "@packages/graphql";

export interface Props {
  post: Post;
  index: number;
}

export interface State {
  liked: boolean;
}
