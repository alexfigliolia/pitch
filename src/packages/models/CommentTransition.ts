import { State } from "@figliolia/galena";
import type { Post } from "@packages/graphql";
import type { ITransitionState } from "./types";

export class CommentTransitionModel extends State<ITransitionState> {
  constructor() {
    super("Comment Transition", {
      X: 0,
      Y: 0,
      index: -1,
      height: 0,
      post: CommentTransitionModel.emptyPost,
    });
  }

  public set(nextState: Omit<ITransitionState, "active" | "animationState">) {
    this.update(state => {
      state.X = nextState.X;
      state.Y = nextState.Y;
      state.post = nextState.post;
      state.index = nextState.index;
      state.height = nextState.height;
    });
  }

  public resetIndex() {
    return this.update(state => {
      state.index = -1;
    });
  }

  public clear() {
    this.update(state => {
      state.X = 0;
      state.Y = 0;
      state.index = -1;
      state.height = 0;
      state.post = CommentTransitionModel.emptyPost;
    });
  }

  private static get emptyPost() {
    return {} as unknown as Post;
  }
}
