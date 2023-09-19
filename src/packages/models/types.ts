import type { Post } from "@packages/graphql";

export interface ITransitionState {
  X: number;
  Y: number;
  post: Post;
  index: number;
  height: number;
}
