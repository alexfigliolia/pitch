import type { Post } from "@packages/graphql";

export interface ITransitionState {
  X: number;
  Y: number;
  post: Post;
  height: number;
  postIndex: number;
}
